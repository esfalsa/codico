import { Disclosure } from "@headlessui/react";
import { Key } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import useSWR, { SWRResponse } from "swr";

type FetchError = Error & { info?: string | JSON; status?: number };

async function fetcher(resource: URL): Promise<any> {
	const response = await fetch(resource);
	return response.json();
}

function useSheet(id?: string) {
	const { data: dispatches, error: dispatchesError } = useSWR(
		id ? `https://opensheet.elk.sh/${id}/Dispatches` : null,
		fetcher
	);
	const { data: templates, error: templatesError } = useSWR(
		id ? `https://opensheet.elk.sh/${id}/Templates` : null,
		fetcher
	);

	return {
		data: dispatches,
		isLoading: !dispatchesError && !templatesError && !dispatches && !templates,
		isError: dispatchesError || templatesError,
	};
}

type Dispatch = {
	Title?: string;
	Category?: string;
	Subcategory?: string;
	Text?: string;
};

export default function SheetView({ id }: { id?: string }) {
	const { data, isLoading, isError } = useSheet(id);

	if (!id) return <div>Please enter a spreadsheet URL.</div>;

	if (isError) return <div>Failed to load.</div>;

	if (isLoading || !data) return <div>Loading…</div>;

	return (
		<>
			{data.map(
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
							className="p-4 border shadow-sm bg-base-100 rounded-md border-slate-400 dark:border-slate-600"
						>
							<h3 className="text-xl font-bold">{element.Title}</h3>
							<p className="font-medium text-slate-500">
								{element.Category} → {element.Subcategory}
							</p>
							<Disclosure>
								{({ open }) => (
									<>
										<Disclosure.Button className="flex flex-row mt-2 text-slate-500">
											Show content{" "}
											<ChevronDown
												className={`${
													open ? "rotate-180 transform" : ""
												} h-6 w-6 transition duration-150 ease-in-out`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="p-2 mt-2 whitespace-pre-wrap border rounded bg-slate-50 border-slate-400 dark:border-slate-600 dark:bg-slate-700	">
											<p>{element.Text}</p>
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
