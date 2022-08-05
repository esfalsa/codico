import { Disclosure } from "@headlessui/react";
import { Key } from "react";
import { ChevronDown } from "react-feather";
import useSWR from "swr";
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

	if (!id) {
		return (
			<div className="dark:text-slate-100 space-y-4">
				<p>No dispatches loaded. Enter a spreadsheet URL to get started.</p>
				<p>
					Don’t have one yet? Get started with our{" "}
					<a
						href="https://docs.google.com/spreadsheets/d/1qfOmRyRxP19wB_bHm2YFtmy2Nd9-cK8b0iyh8c2JZjc/copy?title=Codico%20Template"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-teal-600 font-medium text-teal-500 transition ease-in-out"
					>
						official starter template
					</a>
					.
				</p>
			</div>
		);
	}

	if (error) return <div>Failed to load.</div>;

	if (isValidating) return <div>Loading…</div>;

	return (
		<div className="space-y-4">
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
							className="bg-base-100 border-slate-200 dark:border-slate-600 p-4 border rounded-md shadow-sm"
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
										<Disclosure.Panel className="bg-slate-50 border-slate-200 dark:border-slate-600 dark:bg-slate-700 p-2 mt-2 whitespace-pre-wrap border rounded">
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
		</div>
	);
}
