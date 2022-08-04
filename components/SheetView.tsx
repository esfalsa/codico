import { Disclosure } from "@headlessui/react";
import { Key } from "react";
import { ChevronDown } from "react-feather";
import useSWR from "swr";
const Handlebars = require("handlebars/dist/handlebars");

type FetchError = Error & { info?: string | JSON; status?: number };

async function fetcher(resource: URL): Promise<any> {
	const response = await fetch(resource);
	return response.json();
}

function useSheet(id?: string) {
	const {
		data: dispatches,
		error: dispatchesError,
		isValidating: dispatchesIsValidating,
	} = useSWR(id ? `https://opensheet.elk.sh/${id}/Dispatches` : null, fetcher);
	const {
		data: templates,
		error: templatesError,
		isValidating: templatesIsValidating,
	} = useSWR(id ? `https://opensheet.elk.sh/${id}/Templates` : null, fetcher);
	const {
		data: variables,
		error: variablesError,
		isValidating: variablesIsValidating,
	} = useSWR(id ? `https://opensheet.elk.sh/${id}/Variables` : null, fetcher);

	if (dispatches?.error || templates?.error || variables?.error) {
		return {
			data: dispatches,
			error: true,
			isValidating:
				dispatchesIsValidating ||
				templatesIsValidating ||
				variablesIsValidating,
		};
	}

	templates?.forEach((template: Template) => {
		Handlebars.registerPartial(
			template["Template Name"],
			template["Template Content"]
		);
	});

	let hbsInput: { [key: string]: string } = {};

	variables?.forEach((variable: Variable) => {
		hbsInput[variable["Variable Name"]] = variable["Variable Value"];
	});

	dispatches?.forEach((dispatch: Dispatch) => {
		const dispatchTemplate = Handlebars.compile(dispatch.Text);
		try {
			dispatch.Text = dispatchTemplate(hbsInput);
		} catch (error: any) {
			dispatch.Text = error.message;
		}
	});

	return {
		data: dispatches,
		error: dispatchesError || templatesError || variablesError,
		isValidating:
			dispatchesIsValidating || templatesIsValidating || variablesIsValidating,
	};
}

type Dispatch = {
	Title?: string;
	Category?: string;
	Subcategory?: string;
	Text?: string;
};

type Template = {
	"Template Name": string;
	"Template Content": string;
};

type Variable = {
	"Variable Name": string;
	"Variable Value": string;
};

export function SheetView({ id }: { id?: string }) {
	const { data, isValidating, error } = useSheet(id);

	if (!id) return <div>Please enter a spreadsheet URL.</div>;

	if (error) return <div>Failed to load.</div>;

	if (isValidating) return <div>Loading…</div>;

	return (
		<>
			{data?.map(
				(
					element: {
						Title: string;
						Category: string;
						Subcategory: string;
						Text: string;
					},
					index: Key
				) => {
					return (
						<div
							key={index}
							className="bg-base-100 border-slate-400 dark:border-slate-600 p-4 border rounded-md shadow-sm"
						>
							<h3 className="text-xl font-bold">{element.Title}</h3>
							<p className="text-slate-500 font-medium">
								{element.Category} → {element.Subcategory}
							</p>
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="text-slate-500 flex flex-row mt-2">
											{open ? "Collapse" : "Show content"}{" "}
											<ChevronDown
												className={`${
													open ? "rotate-180 transform" : ""
												} h-6 w-6 transition duration-150 ease-in-out`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="bg-slate-50 border-slate-400 dark:border-slate-600 dark:bg-slate-700 p-2 mt-2 whitespace-pre-wrap border rounded">
											<p>{element.Text}</p>
											<Disclosure.Button className="text-slate-500 flex flex-row mt-2">
												Collapse{" "}
												<ChevronDown
													className={`${
														open ? "rotate-180 transform" : ""
													} h-6 w-6 transition duration-150 ease-in-out`}
												/>
											</Disclosure.Button>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						</div>
					);
				}
			)}
		</>
	);
}
