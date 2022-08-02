import { useAuth } from "../../components/AuthProvider";
import { useEffect } from "react";
import LinkButton from "../../components/linkButton";

export default function SignOut() {
	const { auth } = useAuth();

	useEffect(() => {
		auth.signOut();
	}, [auth]);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="sm:border-zinc-300 sm:p-8 sm:border sm:rounded-lg sm:shadow-lg dark:sm:border-zinc-600 flex flex-col max-w-md gap-4">
				<h1 className="sm:text-2xl text-xl font-bold">Log out</h1>
				<p className="text-zinc-500 dark:text-zinc-400 sm:text-base text-sm">
					You have been logged out.
				</p>

				<LinkButton color="primary" className="w-full mt-4" href="/">
					Return Home
				</LinkButton>
			</div>
		</div>
	);
}
