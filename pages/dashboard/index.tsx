import Link from "next/link";

Dashboard.title = "Dashboard";
Dashboard.requireAuth = true;

export default function Dashboard() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen gap-4">
			<div className="w-full max-w-xs text-center">
				<h1 className="dark:text-teal-600 text-6xl font-extrabold text-teal-500">
					Codico
				</h1>
				<p className="text-xl font-medium">Coming soon!</p>
				<Link href="/">
					<a className="btn btn-primary w-full mt-4">Return Home</a>
				</Link>
			</div>
		</div>
	);
}
