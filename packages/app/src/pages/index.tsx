import React from "react";

import { GetStaticProps } from "next";

import {
	resolveAllPromisesDeep,
	updateAllImages,
	updateImage,
} from "@shared/client-utils/plaiceholderImages";
import { homePageQuery, HomePageTypes } from "@shared/gql/entrytype.gql";
import cmsClient from "@shared/pages-utils/cmsClient";
import Home from "@shared/ui/layouts/Home";
import Layout from "@shared/ui/layouts/Layout";

export interface IPageProps {
	[k: string]: any;
}

function Index(): JSX.Element {
	// props: { data: HomePageTypes }
	return (
		<Home
		// data={props.data}
		/>
	);
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

	const updatedData = await updateAllImages(data, await updateImage);

	return {
		props: {
			data: await resolveAllPromisesDeep(updatedData),
		},
		revalidate: 1,
	};
};
