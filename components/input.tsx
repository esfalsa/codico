import type { NextPage } from "next";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { clsx } from "clsx";

import styles from "../styles/Controls.module.css";

type Props = {
	className?: string;
	[key: string]: any;
};

const Input: NextPage<Props> = ({ className, ...rest }) => {
	return <input className={clsx(styles.input, className)} {...rest} />;
};

export default Input;
