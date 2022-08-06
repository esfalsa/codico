import { useState } from "react";
import { SheetSection } from "../../components/SheetSection";
import { PublishSection } from "../../components/PublishSection";
import { MonitorSection } from "../../components/MonitorSection";
import { OptionsContext } from "../../components/OptionsContext";

Dashboard.title = "Dashboard";

export default function Dashboard() {
	const [currentSection, setCurrentSection] = useState(0);
	const [url, setUrl] = useState("");
	const [dispatches, setDispatches] = useState<Dispatch[]>([]);
	const [user, setUser] = useState("");
	const [nation, setNation] = useState("");
	const [password, setPassword] = useState("");

	const continueHandler = () => {
		setCurrentSection(currentSection + 1);
	};
	const backHandler = () => {
		setCurrentSection(currentSection - 1);
	};

	const sections = [
		{
			title: "Import",
			description: "Load your dispatches from a spreadsheet.",
			section: <SheetSection continueHandler={continueHandler} />,
		},
		{
			title: "Publish",
			description: "Post or update your dispatches on NationStates.",
			section: (
				<PublishSection
					continueHandler={continueHandler}
					backHandler={backHandler}
				/>
			),
		},
		{
			title: "Monitor",
			description: "Check the status of your dispatches as they are deployed.",
			section: <MonitorSection backHandler={backHandler} />,
		},
	];

	return (
		<main className="md:px-8 min-h-ca lg:px-16 max-w-8xl bg-slate-100 dark:bg-slate-900 flex-1 w-full mx-auto">
			<div className="md:grid md:grid-cols-3 md:gap-6 md:py-16 md:px-0 h-screen px-4 py-8">
				<div className="md:col-span-1 space-y-12">
					{sections.map((section, index) => {
						return (
							<button
								key={index}
								className="block text-left"
								onClick={() => {
									setCurrentSection(index);
								}}
							>
								<p className="font-bold">{section.title}</p>
								<p className="text-slate-500 dark:text-slate-400 text-sm">
									{section.description}
								</p>
							</button>
						);
					})}
				</div>
				<OptionsContext.Provider
					value={{
						url,
						setUrl,
						dispatches,
						setDispatches,
						user,
						setUser,
						nation,
						setNation,
						password,
						setPassword,
					}}
				>
					{sections[currentSection].section}
				</OptionsContext.Provider>
			</div>
		</main>
	);
}
