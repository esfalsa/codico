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
			<main className="">{children}</main>
		</>
	);
};

export default Layout;
