import React, { ReactElement, ReactNode, useEffect } from "react";

import { AppProps } from "next/app";

import { GoogleTagManager } from "@next/third-parties/google";

import "../user-interface/scss/main.scss";

import { NextPage } from "next";

import { gtmPageView } from "@/pages-utils/gtm";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function AppRoot({
	Component,
	pageProps,
}: AppPropsWithLayout): JSX.Element {
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
				// TODO STARTUP: Replace this
				<GoogleTagManager gtmId="" />
			)}

			{getLayout(<Component data={data} {...rest} />)}
		</>
	);
}
