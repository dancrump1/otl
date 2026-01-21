import React from "react";

import { GetStaticProps } from "next";

import { homePageQuery, HomePageTypes } from "@/gql/entrytype.gql";
import {
	footerQuery,
	headerQuery,
	NavInterface,
	NavQuery,
} from "@/gql/globals.gql";
import cmsClient from "@/pages-utils/cmsClient";
import {
	resolveAllPromisesDeep,
	updateAllImages,
	updateImage,
} from "@/user-interface/client-utils/getPlaiceholder";
import Home from "@/user-interface/layouts/Home";
import Layout from "@/user-interface/layouts/Layout";

// TODO: Add interface for home page props
export interface IPageProps {
	[k: string]: any;
}

function Index(props: { data: HomePageTypes }): JSX.Element {
	return <Home data={props.data} />;
}

Index.getLayout = function getLayout(page: any) {
	const pageProps = page.props;

	return <Layout pageProps={pageProps}>{page}</Layout>;
};

export default Index;

export const getStaticProps: GetStaticProps = async ({
	preview,
	previewData,
}) => {
	const client = cmsClient(
		preview,
		typeof previewData === "string" || previewData === false
			? previewData
			: (previewData as { token?: string })?.token
	);
	const data: HomePageTypes = await client.request(homePageQuery);

	const nav: NavInterface = await client.request(NavQuery);
	const header = await client.request(headerQuery);
	const footer = await client.request(footerQuery);

	const updatedData = await updateAllImages(data, await updateImage);

	return {
		props: {
			data: await resolveAllPromisesDeep(updatedData),
			nav,
			header,
			footer,
		},
		revalidate: 1,
	};
};
