import { ReactNode } from "react";
import type { NextPage } from "next";

type Props = {
  children?: ReactNode;
  className?: string;
  color?: string;
  as?: "button" | "a";
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
    className +=
      " bg-teal-500 hover:bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-500 text-white shadow-teal-400/25";
  } else {
    className +=
      " bg-transparent text-zinc-900 ring-1 ring-zinc-500 dark:text-white hover:bg-zinc-900/5 dark:hover:bg-white/5";
  }

  const Tag = as ?? "button";

  return (
    <Tag
      type="button"
      className={`inline-flex justify-center px-3 py-2 text-sm font-semibold rounded-md shadow-md transition duration-200 ease-in-out ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Button;
