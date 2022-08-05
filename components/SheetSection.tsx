import { useState } from "react";
import { SheetView } from "./SheetView";

export function SheetSection() {
	const [url, setURL] = useState<string>("");
	const [id, setId] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setId(url.match(/(?<=d\/).*?(?=\/|$)/g)![0]);
	};

	return (
		<div className="flex flex-col h-full gap-4">
			<form className="flex-0 flex flex-row gap-4" onSubmit={handleSubmit}>
				<input
					type="url"
					className="input input-bordered flex-1 !text-base"
					placeholder="Spreadsheet URL"
					required
					value={url}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setURL(e.currentTarget.value);
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
	);
}
