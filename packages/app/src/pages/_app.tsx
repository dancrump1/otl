import React, { useEffect } from "react";

import { AppProps } from "next/app";

import { GoogleTagManager } from "@next/third-parties/google";

import "../client/scss/main.scss";

import { gtmPageView } from "@/helpers/gtm";

export default function AppRoot({
	Component,
	pageProps,
}: AppProps): JSX.Element {
	const { data, ...rest } = pageProps;

	const getLayout = Component.getLayout || ((page) => page);

	useEffect(() => {
		const props = {
			page_title: pageProps.page || null,
		};
		gtmPageView(props);
	}, [pageProps]);

	return (
		<>
			{process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
				<GoogleTagManager gtmId="" />
			)}

			{getLayout(<Component data={data} {...rest} />)}
		</>
	);
}
