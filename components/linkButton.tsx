import type { NextPage } from "next";
import { ReactNode } from "react";
import { clsx } from "clsx";
import Link from "next/link";

import styles from "../styles/Controls.module.css";

type Props = {
	children?: ReactNode;
	className?: string;
	color?: string;
	href: string;
	[key: string]: any;
};

const Button: NextPage<Props> = ({
	children,
	className,
	color,
	href,
	...rest
}) => {
	if (color === "primary") {
		className = clsx(className, styles.btn__primary);
	} else {
		className = clsx(className, styles.btn__default);
	}

	return (
		<Link href={href} className="outline-none">
			<a className={clsx(styles.btn, className)} {...rest}>
				{children}
			</a>
		</Link>
	);
};

export default Button;
