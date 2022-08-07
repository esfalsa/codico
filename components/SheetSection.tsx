import { Field, useFormikContext } from "formik";
import { EventHandler, useEffect, useState } from "react";
import useSWR from "swr";
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

export function SheetSection() {
	const [id, setId] = useState("");
	const {
		values: { url },
		setFieldValue,
	} = useFormikContext<FormFields>();
	const { data, isValidating, error } = useSheet(id);

	useEffect(() => {
		setFieldValue("dispatches", data || []);
	}, [data, setFieldValue]);

	useEffect(() => {
		setId(url.match(/(?<=d\/).*?(?=\/|$)/g)?.[0] ?? "");
	}, [url]);

	return (
		<>
			<Field
				name="url"
				type="url"
				className="input input-bordered !text-base"
				placeholder="Spreadsheet URL"
				required
			/>
			<div className="bg-slate-50 dark:bg-slate-900/50 sm:p-8 flex-1 w-full p-4 overflow-y-auto rounded-lg shadow-inner">
				<SheetView
					dispatches={data}
					error={error}
					isValidating={isValidating}
				/>
			</div>
		</>
	);
}
