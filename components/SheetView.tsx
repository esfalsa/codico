import { Key, useContext, useEffect } from "react";
import { ChevronDown } from "react-feather";
import useSWR from "swr";
import { Disclosure } from "@headlessui/react";
const Handlebars = require("handlebars/dist/handlebars");
import { OptionsContext } from "./OptionsContext";

export function SheetView({
	dispatches,
	error,
	isValidating,
}: {
	dispatches?: Dispatch[];
	error?: string;
	isValidating: boolean;
}) {
	if (error) return <div>Failed to load.</div>;

	if (!dispatches || !dispatches.length) {
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

	if (isValidating) return <div>Loading…</div>;

	return (
		<div className="space-y-4">
			{dispatches?.map((element: Dispatch, index: Key) => {
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
			})}
		</div>
	);
}
