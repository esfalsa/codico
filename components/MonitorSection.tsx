import { ArrowRight, Check } from "react-feather";

export function MonitorSection() {
	return (
		<div className="grid grid-cols-[1fr_min-content] w-full gap-y-2">
			<div className="bg-slate-100 dark:bg-slate-900/50 rounded-l-md p-2">
				<h3 className="text-slate-900 dark:text-slate-100 font-bold tracking-tight">
					Lorem ipsum
				</h3>
				<p className="text-slate-600 dark:text-slate-400 flex flex-row items-center gap-1 text-sm">
					Meta <ArrowRight size="1em" /> Reference{" "}
				</p>
			</div>
			<div className="bg-slate-100 dark:bg-slate-900/50 rounded-r-md flex flex-row items-center gap-2 p-2 text-green-500">
				Published <Check size="1em" />
			</div>
			<div className="bg-slate-100 dark:bg-slate-900/50 rounded-l-md p-2">
				<h3 className="text-slate-900 dark:text-slate-100 font-bold tracking-tight">
					Lorem ipsum
				</h3>
				<p className="text-slate-600 dark:text-slate-400 flex flex-row items-center gap-1 text-sm">
					Meta <ArrowRight size="1em" /> Reference{" "}
				</p>
			</div>
			<div className="bg-slate-100 dark:bg-slate-900/50 rounded-r-md flex flex-row items-center gap-2 p-2 text-yellow-500">
				Deploying{" "}
				<div className="grid grid-cols-1">
					<span className="animate-ping inline-flex w-3 h-3 col-span-1 col-start-1 row-span-1 row-start-1 bg-yellow-500 rounded-full"></span>
					<span className="top-0 left-0 inline-flex w-3 h-3 col-span-1 col-start-1 row-span-1 row-start-1 bg-yellow-500 rounded-full"></span>
				</div>
			</div>
		</div>
	);
}
