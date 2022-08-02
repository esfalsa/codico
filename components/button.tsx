import type { NextPage } from "next";
import { ReactNode } from "react";
import { clsx } from "clsx";

import styles from "../styles/Controls.module.css";

type Props = {
	children?: ReactNode;
	className?: string;
	color?: string;
	as?: "button" | "a" | "div";
	[key: string]: any;
};

const Button: NextPage<Props> = ({
	children,
	className,
	color,
	as,
	...rest
}) => {
	if (color === "primary") {
		className = clsx(className, styles.btn__primary);
	} else {
		className = clsx(className, styles.btn__default);
	}

	const Tag = as ?? "button";

	return (
		<Tag className={clsx(styles.btn, className)} {...rest}>
			{children}
		</Tag>
	);
};

export default Button;
