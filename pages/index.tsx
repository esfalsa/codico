import type { NextPage } from "next";
import { GitHub, Edit } from "react-feather";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col justify-center h-screen">
			<div className="space-y-2">
				<div className="px-3 py-2 text-xl font-bold text-white uppercase bg-teal-500 rounded-lg shadow-medium max-w-fit">
					Coming Soon
				</div>
				<div className="text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
					<h1>Your dispatches.</h1>
					<h1 className="inline-block leading-tight text-transparent bg-gradient-to-br from-cyan-300 to-lime-600 bg-clip-text">
						Your styles.
					</h1>
				</div>
				<p className="max-w-2xl font-medium md:text-lg lg:text-xl text-md">
					With Codico, you can write your dispatches your way, with your own
					templates and styles. And when you’re done, you can publish or update
					them on NationStates with just a few clicks.
				</p>
			</div>

			<div className="flex flex-row mt-8 space-x-6">
				<Link href="/dashboard">
					<a className="text-lg btn btn-primary">
						<Edit size={"1em"} className="mr-2" /> Get Started
					</a>
				</Link>
				<a
					href="https://github.com/esfalsa/codico"
					className="text-lg btn btn-secondary"
				>
					<GitHub size={"1em"} className="mr-2" /> View on GitHub
				</a>
			</div>
		</div>
	);
};

export default Home;
