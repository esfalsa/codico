import "../styles/globals.css";
import "@fontsource/inter/variable.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { AuthProvider } from "../components/AuthProvider";
import { AuthGuard } from "../components/AuthGuard";

function MyApp(props: AppProps) {
	const {
		Component,
		pageProps,
	}: { Component: NextPage & { requireAuth?: boolean }; pageProps: any } =
		props;

	return (
		<>
			<Head>
				<title>Codico</title>
			</Head>
			<Layout>
				<AuthProvider>
					{Component.requireAuth ? (
						<AuthGuard>
							<Component {...pageProps} />
						</AuthGuard>
					) : (
						<Component {...pageProps} />
					)}
				</AuthProvider>
			</Layout>
		</>
	);
}

export default MyApp;
