import { useFormikContext } from "formik";
import React, { EventHandler, useContext, useEffect, useState } from "react";
import { ArrowRight, Check, X } from "react-feather";
import { DispatchPoster } from "../lib/DispatchPoster";

export function MonitorSection() {
	const {
		values: { dispatches, user, nation, password },
	} = useFormikContext<FormFields>();
	const [progress, setProgress] = useState<string[]>([]);

	useEffect(() => {
		const dispatchPoster = new DispatchPoster(
			dispatches,
			`${user} using Codico; tool by Esfalsa`,
			nation,
			password,
			(status) => {
				setProgress([...status]);
			}
		);
		dispatchPoster.deployAll();
	}, []);

	const statusDisplays: Record<string, JSX.Element> = {
		published: (
			<div className="dark:text-green-500 flex-0 flex flex-row items-center gap-1 p-2 font-medium text-green-600">
				Published <Check size="1em" />
			</div>
		),
		error: (
			<div className="dark:text-rose-500 text-rose-600 flex-0 flex flex-row items-center gap-1 p-2 font-medium">
				Error <X size="1em" />
			</div>
		),
		pending: (
			<div className="flex-0 flex flex-row items-center gap-2 p-2 text-yellow-500">
				Deploying{" "}
				<div className="grid grid-cols-1">
					<span className="animate-ping inline-flex w-3 h-3 col-span-1 col-start-1 row-span-1 row-start-1 bg-yellow-500 rounded-full"></span>
					<span className="top-0 left-0 inline-flex w-3 h-3 col-span-1 col-start-1 row-span-1 row-start-1 bg-yellow-500 rounded-full"></span>
				</div>
			</div>
		),
		queued: (
			<div className="dark:text-slate-500 text-slate-600 flex-0 flex flex-row items-center gap-1 p-2 font-medium">
				Queued
			</div>
		),
	};

	if (!dispatches || !dispatches.length) {
		return (
			<p>No dispatches loaded. Make sure you import a spreadsheet first!</p>
		);
	}

	return (
		<>
			{dispatches?.map(({ Title, Category, Subcategory }, index) => {
				return (
					<div
						className="bg-slate-100 dark:bg-slate-900/50 flex flex-row justify-between rounded-md"
						key={index}
					>
						<div className=" flex-1 p-2">
							<h3 className="text-slate-900 dark:text-slate-100 font-bold tracking-tight">
								{Title}
							</h3>
							<p className="text-slate-600 dark:text-slate-400 flex flex-row items-center gap-1 text-sm">
								{Category} <ArrowRight size="1em" /> {Subcategory}
							</p>
						</div>
						{statusDisplays[progress[index]] || statusDisplays.queued}
					</div>
				);
			})}
		</>
	);
}
