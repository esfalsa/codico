import type { NextPage } from "next";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
	return (
		<main className="max-w-8xl sm:px-6 md:px-8 px-4 mx-auto">{children}</main>
	);
};

export default Layout;
