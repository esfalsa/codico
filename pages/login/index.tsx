import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useAuth } from "../../components/AuthProvider";

LoginPage.title = "Log In";

export default function LoginPage() {
	const { auth, initializing, getRedirect, clearRedirect, user, error } =
		useAuth();
	const [nation, setNation] = useState("");
	const [checksum, setChecksum] = useState("");
	const [verifying, setVerifying] = useState(false);
	const mounted = useRef<boolean>();
	const router = useRouter();

	// Guard if page is navigated away while sign in process is still active
	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (!initializing) {
			if (user) {
				const redirect = getRedirect();
				if (redirect) {
					router.push(redirect); // go to page which redirected to login
					clearRedirect();
				} else {
					router.push("/dashboard"); // go to default protected page
				}
			}
		}
	}, [router, getRedirect, clearRedirect, initializing, user]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (nation && checksum) {
			try {
				setVerifying(true);
				await auth.signIn(nation, checksum);
			} catch (error) {
				if (mounted.current) {
					setVerifying(false);
				}
			}
		}
	};

	if (user) return null;

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<form
				className="flex flex-col max-w-md sm:border-zinc-300 sm:p-8 sm:border sm:rounded-lg sm:shadow-lg dark:sm:border-zinc-600 gap-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-xl font-bold sm:text-2xl">
					Please verify your nation
				</h1>
				<p className="text-sm text-zinc-500 dark:text-zinc-400 sm:text-base">
					Don’t worry, you aren’t granting us any access to your nation; we’re
					just checking you’re signed in.
				</p>
				<div className="mt-2 space-y-1">
					<input
						type="text"
						className={clsx(
							"input input-bordered w-full",
							error && "input-error"
						)}
						placeholder="Nation name"
						value={nation}
						required
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setNation(e.currentTarget.value);
						}}
					/>
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						Please enter the name of your main nation. This nation will be used
						to identify you to the NationStates site.
					</p>
				</div>
				<div className="space-y-1">
					<input
						type="text"
						className={clsx(
							"input input-bordered w-full",
							error && "input-error"
						)}
						placeholder="Verification code"
						value={checksum}
						required
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setChecksum(e.currentTarget.value);
						}}
					/>
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						You can find your verification code in your nation’s{" "}
						<a
							href="https://www.nationstates.net/page=verify_login"
							target="_blank"
							rel="noopener noreferrer"
							className="text-teal-600 underline decoration-2 decoration-teal-500/50 hover:text-teal-500 hover:decoration-teal-500/30 transition duration-150 ease-in-out"
						>
							Login Verification page
						</a>{" "}
						on NationStates.
					</p>
				</div>
				<button type="submit" className="mt-2 btn btn-primary">
					{verifying ? "Verifying…" : "Submit"}
				</button>
			</form>
		</div>
	);
}
