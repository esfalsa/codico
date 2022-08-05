import { useState } from "react";
import clsx from "clsx";
import { SheetSection } from "../../components/SheetSection";
import { PublishSection } from "../../components/PublishSection";
import { MonitorSection } from "../../components/MonitorSection";

Dashboard.title = "Dashboard";

export default function Dashboard() {
	const [currentSection, setCurrentSection] = useState(0);
	const [dispatches, setDispatches] = useState([]);

	const sections = [
		{
			title: "Import",
			description: "Load your dispatches from a spreadsheet.",
			section: <SheetSection />,
		},
		{
			title: "Publish",
			description: "Post or update your dispatches on NationStates.",
			section: <PublishSection />,
		},
		{
			title: "Monitor",
			description: "Check the status of your dispatches as they are deployed.",
			section: <MonitorSection />,
		},
	];

	return (
		<main className="md:px-8 min-h-ca lg:px-16 max-w-8xl bg-slate-100 dark:bg-slate-900 flex-1 w-full mx-auto">
			<div className="md:grid md:grid-cols-3 md:gap-6 md:py-16 md:px-0 h-screen px-4 py-8">
				<div className="md:col-span-1 space-y-12">
					{sections.map((section) => {
						return (
							<div>
								<p className="font-bold">{section.title}</p>
								<p className="text-slate-500 dark:text-slate-400 text-sm">
									{section.description}
								</p>
							</div>
						);
					})}
				</div>
				<div className="md:col-span-2 md:mt-0 dark:bg-slate-800 flex flex-col mt-8 overflow-hidden bg-white rounded-md shadow">
					<div className="flex-1 p-4 overflow-scroll">
						{sections[currentSection].section}
					</div>
					<div className="bg-slate-50 dark:bg-slate-900/50 flex flex-row justify-between p-4">
						<button
							className={clsx(
								"btn btn-secondary",
								currentSection == 0 && "btn-disabled"
							)}
							onClick={() => {
								setCurrentSection(currentSection - 1);
							}}
						>
							Back
						</button>
						<button
							className="btn btn-primary"
							onClick={() => {
								setCurrentSection(currentSection + 1);
							}}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
