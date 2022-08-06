import clsx from "clsx";
import { EventHandler, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { OptionsContext } from "./OptionsContext";
import { SheetView } from "./SheetView";
const Handlebars = require("handlebars/dist/handlebars");

async function fetcher(resource: URL): Promise<any> {
	const response = await fetch(resource);
	return response.json();
}

function useSheet(id?: string) {
	const {
		data: variables,
		error: variablesError,
		isValidating: variablesIsValidating,
	} = useSWR(id ? `https://opensheet.elk.sh/${id}/Variables` : null, fetcher);
	const {
		data: templates,
		error: templatesError,
		isValidating: templatesIsValidating,
	} = useSWR(id ? `https://opensheet.elk.sh/${id}/Templates` : null, fetcher);
	const {
		data: dispatches,
		error: dispatchesError,
		isValidating: dispatchesIsValidating,
	} = useSWR(id ? `https://opensheet.elk.sh/${id}/Dispatches` : null, fetcher);

	if (
		dispatches?.error ||
		templates?.error ||
		variables?.error ||
		variablesError ||
		templatesError ||
		dispatchesError
	) {
		return {
			data: null,
			error: true,
			isValidating:
				dispatchesIsValidating ||
				templatesIsValidating ||
				variablesIsValidating,
		};
	}

	if (dispatches && templates && variables) {
		let hbsInput: { [key: string]: string } = {};

		variables?.forEach((variable: Variable) => {
			hbsInput[variable["Variable Name"]] = variable["Variable Value"];
		});

		templates?.forEach((template: Template) => {
			Handlebars.registerPartial(
				template["Template Name"],
				template["Template Content"]
			);
		});

		dispatches?.forEach((dispatch: Dispatch) => {
			const dispatchTemplate = Handlebars.compile(dispatch.Text);
			try {
				dispatch.Text = dispatchTemplate(hbsInput);
			} catch (error: any) {
				dispatch.Text = `Error parsing templates: ${error.message}`;
			}
		});
	}

	return {
		data: dispatches,
		error: dispatchesError,
		isValidating:
			dispatchesIsValidating || templatesIsValidating || variablesIsValidating,
	};
}

export function SheetSection({
	continueHandler,
}: {
	continueHandler?: EventHandler<any>;
}) {
	// const [url, setUrl] = useState("");
	const [id, setId] = useState("");
	const { url, setUrl, dispatches, setDispatches } = useContext(OptionsContext);
	const { data, isValidating, error } = useSheet(id);

	useEffect(() => {
		setDispatches(data);
	}, [data]);

	useEffect(() => {
		setId(url.match(/(?<=d\/).*?(?=\/|$)/g)?.[0] ?? "");
	}, [url]);

	return (
		<div className="md:col-span-2 md:mt-0 dark:bg-slate-800 flex flex-col mt-8 overflow-hidden bg-white rounded-md shadow">
			<div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-scroll">
				<input
					type="url"
					className="input input-bordered !text-base"
					placeholder="Spreadsheet URL"
					required
					value={url}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setUrl(e.currentTarget.value);
					}}
				/>
				<div className="bg-slate-50 dark:bg-slate-900/50 sm:p-8 flex-1 w-full p-4 overflow-y-auto rounded-lg shadow-inner">
					<SheetView
						dispatches={data}
						error={error}
						isValidating={isValidating}
					/>
				</div>
			</div>
			<div className="bg-slate-50 dark:bg-slate-900/50 flex flex-row justify-end p-4">
				<button
					className={clsx(
						"btn btn-primary",
						(dispatches ?? []).length == 0 && "btn-disabled"
					)}
					onClick={continueHandler}
				>
					Continue
				</button>
			</div>
		</div>
	);
}
