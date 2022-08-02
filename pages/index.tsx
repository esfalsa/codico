import type { NextPage } from "next";
import Button from "../components/button";
import { GitHub, LogIn } from "react-feather";
import LinkButton from "../components/linkButton";

const Home: NextPage = () => {
	return (
		<div className="flex flex-col justify-center h-screen">
			<div className="space-y-2">
				<div className="shadow-medium max-w-fit px-3 py-2 text-xl font-bold text-white uppercase bg-teal-500 rounded-lg">
					Coming Soon
				</div>
				<div className="md:text-7xl lg:text-8xl text-6xl font-extrabold tracking-tight">
					<h1>Your dispatches.</h1>
					<h1 className="bg-gradient-to-br from-cyan-300 to-lime-600 bg-clip-text inline-block leading-tight text-transparent">
						Your styles.
					</h1>
				</div>
				<p className="md:text-lg lg:text-xl text-md max-w-2xl font-medium">
					With Codico, you can write your dispatches your way, with your own
					templates and styles. And when you’re done, you can publish or update
					them on NationStates with just a few clicks.
				</p>
			</div>

			<div className="flex flex-row mt-8 space-x-6">
				<LinkButton
					href="/login"
					color="primary"
					className="!px-4 !py-2 !text-lg"
				>
					<LogIn size={"1em"} className="mr-2" /> Sign In
				</LinkButton>
				<Button
					as="a"
					className="!px-4 !py-2 !text-lg"
					href="https://github.com/esfalsa/codico"
				>
					<GitHub size={"1em"} className="mr-2" /> View on GitHub
				</Button>
			</div>
		</div>
	);
};

export default Home;
