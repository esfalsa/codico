import NextHead from "next/head";

export default function Head({ title }: { title?: string }) {
	title = title ? `Codico | ${title}` : "Codico";

	return (
		<NextHead>
			{/* HTML Meta Tags */}
			<title>{title}</title>
			<meta
				name="description"
				content="Supercharge your dispatches with your own templates and styles using Codico, and publish or update them on NationStates with just a few clicks."
			/>

			{/* OpenGraph Meta Tags */}
			<meta property="og:url" content="https://esfalsa.github.io/codico/" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta
				property="og:description"
				content="Supercharge your dispatches with your own templates and styles using Codico, and publish or update them on NationStates with just a few clicks."
			/>

			{/* Twitter Meta Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content="esfalsa.github.io" />
			<meta
				property="twitter:url"
				content="https://esfalsa.github.io/codico/"
			/>
			<meta name="twitter:title" content="Codico | {title}" />
			<meta
				name="twitter:description"
				content="Supercharge your dispatches with your own templates and styles using Codico, and publish or update them on NationStates with just a few clicks."
			/>
		</NextHead>
	);
}
