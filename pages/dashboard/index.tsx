import Link from "next/link";
import { useState } from "react";
import SheetView from "../../components/SheetView";

Dashboard.title = "Dashboard";

export default function Dashboard() {
	const [url, setURL] = useState<string>("");
	const [id, setId] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setId(url.match(/(?<=d\/).*?(?=\/|$)/g)![0]);
	};

	return (
		<div className="flex flex-col h-screen py-8">
			<form className="flex flex-row flex-0 gap-4" onSubmit={handleSubmit}>
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
				<button className="btn flex-0 !text-base">Submit</button>
			</form>
			<div className="mt-8 mb-4 flex-0">
				<h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
					Your Dispatches
				</h2>
			</div>
			<div className="flex-1 w-full p-4 overflow-y-auto rounded-lg shadow-inner space-y-4 bg-slate-100 dark:bg-slate-700 sm:p-8">
				<SheetView id={id} />
			</div>
		</div>
	);
}
