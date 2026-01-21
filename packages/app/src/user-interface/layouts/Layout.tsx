import React from "react";

import { ContentPagesEntry, HomePageTypes } from "@/gql/entrytype.gql";

import HeadContent from "../components/HeadContent";

export default function Layout({
	children,
	pageProps,
}: {
	children: React.ReactNode;
	pageProps: {
		data: { entry: HomePageTypes | ContentPagesEntry };
	};
}) {
	let seo;

	if (pageProps?.data?.entry?.seo) {
		seo = pageProps.data.entry.seo;
	}

	return (
		<>
			<HeadContent {...seo} page={pageProps?.data?.entry} />

			{/* TODO STARTUP: Replace this */}
			<nav />
			{children}
			{/* TODO STARTUP: Replace this */}
			<footer />
		</>
	);
}
