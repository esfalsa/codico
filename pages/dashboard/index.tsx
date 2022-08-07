import { useState } from "react";
import { SheetSection } from "../../components/SheetSection";
import { PublishSection } from "../../components/PublishSection";
import { MonitorSection } from "../../components/MonitorSection";
import { WelcomeSection } from "../../components/WelcomeSection";
import { Form, Formik } from "formik";

Dashboard.title = "Dashboard";

export default function Dashboard() {
	const [step, setStep] = useState(0);
	const [completedSteps, setCompletedSteps] = useState(0);

	const steps = [
		{
			title: "Welcome",
			description: "Learn how to use Codico.",
			section: <WelcomeSection />,
		},
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

	const initialValues: FormFields = {
		url: "",
		dispatches: [],
		user: "",
		nation: "",
		password: "",
	};

	return (
		<main className="md:px-8 lg:px-16 max-w-8xl bg-slate-100 dark:bg-slate-900 flex-1 w-full min-h-screen mx-auto">
			<div className="md:grid md:grid-cols-3 md:gap-6 md:py-16 md:px-0 md:h-screen px-4 py-8">
				<div className="md:col-span-1 md:space-y-12 space-y-4">
					{steps.map((section, index) => {
						return (
							<button
								key={index}
								className="block text-left"
								onClick={() => {
									if (index <= completedSteps) {
										setStep(index);
									}
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
				<Formik
					initialValues={initialValues}
					onSubmit={() => {
						if (step === steps.length - 1) {
							// do something on last step
						} else {
							setStep((step) => step + 1);
							setCompletedSteps((step) => step + 1);
						}
					}}
				>
					<Form
						autoComplete="off"
						className="md:col-span-2 md:mt-0 dark:bg-slate-800 flex flex-col mt-8 overflow-hidden bg-white rounded-md shadow"
					>
						<div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-scroll">
							{steps[step].section}
						</div>
						<div className="bg-slate-50 dark:bg-slate-900/50 flex flex-row justify-between p-4">
							{step > 0 ? (
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => {
										setStep((step) => step - 1);
										setCompletedSteps((step) => step - 1);
									}}
								>
									Back
								</button>
							) : (
								<div />
							)}
							{step < steps.length - 1 && (
								<button type="submit" className="btn btn-primary">
									Continue
								</button>
							)}
						</div>
					</Form>
				</Formik>
			</div>
		</main>
	);
}
