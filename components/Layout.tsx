import type { NextPage } from "next";
import { ReactNode } from "react";
import Head from "./Head";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout: NextPage<Props> = ({ children, title }) => {
	return (
		<>
			<Head title={title} />
			<main className="px-4 mx-auto max-w-8xl sm:px-6 md:px-8">{children}</main>
		</>
	);
};

export default Layout;