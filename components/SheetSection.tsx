import clsx from "clsx";
import { EventHandler, useContext, useState } from "react";
import { OptionsContext } from "./OptionsContext";
import { SheetView } from "./SheetView";

export function SheetSection({
	continueHandler,
}: {
	continueHandler?: EventHandler<any>;
}) {
	const [id, setId] = useState("");
	const { url, setUrl, dispatches } = useContext(OptionsContext);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setId(url.match(/(?<=d\/).*?(?=\/|$)/g)![0]);
	};

	return (
		<div className="md:col-span-2 md:mt-0 dark:bg-slate-800 flex flex-col mt-8 overflow-hidden bg-white rounded-md shadow">
			<div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-scroll">
				<form className="flex-0 flex flex-row gap-4" onSubmit={handleSubmit}>
					<input
						type="url"
						className="input input-bordered flex-1 !text-base"
						placeholder="Spreadsheet URL"
						required
						value={url}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setUrl(e.currentTarget.value);
						}}
					/>
					<button type="submit" className="btn flex-0 !text-base">
						Submit
					</button>
				</form>
				<div className="bg-slate-50 dark:bg-slate-900/50 sm:p-8 flex-1 w-full p-4 overflow-y-auto rounded-lg shadow-inner">
					<SheetView id={id} />
				</div>
			</div>
			<div className="bg-slate-50 dark:bg-slate-900/50 flex flex-row justify-end p-4">
				<button
					className={clsx(
						"btn btn-primary",
						(dispatches ?? []).length == 0 && "btn-disabled"
					)}
					onClick={continueHandler}
				>
					Continue
				</button>
			</div>
		</div>
	);
}
