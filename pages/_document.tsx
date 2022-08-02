import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 antialiased leading-tight bg-white">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
