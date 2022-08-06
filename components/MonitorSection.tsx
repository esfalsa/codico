import { EventHandler, useContext } from "react";
import { ArrowRight, Check } from "react-feather";
import { OptionsContext } from "./OptionsContext";

export function MonitorSection({
	backHandler,
}: {
	backHandler?: EventHandler<any>;
}) {
	const { dispatches } = useContext(OptionsContext);

	return (
		<div className="md:col-span-2 md:mt-0 dark:bg-slate-800 flex flex-col mt-8 overflow-hidden bg-white rounded-md shadow">
			<div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-scroll">
				<div className="grid grid-cols-[1fr_min-content] w-full gap-y-2">
					{!dispatches || !dispatches.length ? (
						<p>
							No dispatches loaded. Make sure you import a spreadsheet first!
						</p>
					) : (
						dispatches?.map(({ Title, Category, Subcategory }, index) => {
							return (
								<>
									<div
										className="bg-slate-100 dark:bg-slate-900/50 rounded-l-md p-2"
										key={index}
									>
										<h3 className="text-slate-900 dark:text-slate-100 font-bold tracking-tight">
											{Title}
										</h3>
										<p className="text-slate-600 dark:text-slate-400 flex flex-row items-center gap-1 text-sm">
											{Category} <ArrowRight size="1em" /> {Subcategory}
										</p>
									</div>
									<div className="bg-slate-100 dark:bg-slate-900/50 rounded-r-md dark:text-green-500 flex flex-row items-center gap-1 p-2 font-medium text-green-600">
										Published <Check size="1em" />
									</div>
								</>
							);
						})
					)}
				</div>
			</div>

			<div className="bg-slate-50 dark:bg-slate-900/50 flex flex-row justify-start p-4">
				<button className="btn btn-secondary" onClick={backHandler}>
					Back
				</button>
			</div>
		</div>
	);
}
