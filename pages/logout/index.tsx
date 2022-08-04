import { useAuth } from "../../components/AuthProvider";
import { useEffect } from "react";
import Link from "next/link";

LogoutPage.title = "Log Out";

export default function LogoutPage() {
	const { auth } = useAuth();

	useEffect(() => {
		auth.signOut();
	}, [auth]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-col max-w-md sm:border-zinc-300 sm:p-8 sm:border sm:rounded-lg sm:shadow-lg dark:sm:border-zinc-600 gap-4">
				<h1 className="text-xl font-bold sm:text-2xl">Log out</h1>
				<p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
					You have been logged out.
				</p>
				<Link href="/">
					<a className="w-full mt-2 btn btn-primary">Return Home</a>
				</Link>
			</div>
		</div>
	);
}
