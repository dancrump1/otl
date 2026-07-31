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
import { getSpotifyEpisodes } from "@/pages-utils/spotify";
import {
	resolveAllPromisesDeep,
	updateAllImages,
	updateImage,
} from "@/user-interface/client-utils/getPlaiceholder";
import Home from "@/user-interface/layouts/Home";
import Layout from "@/user-interface/layouts/Layout";
import { mapCmsBoxiesToEdition } from "@/user-interface/components/v0/boxies-data";

// TODO: Add interface for home page props
export interface IPageProps {
	[k: string]: any;
}

function Index(props: {
	data: { entry: HomePageTypes };
	episodes: Awaited<ReturnType<typeof getSpotifyEpisodes>>;
}): JSX.Element {
	const boxies = mapCmsBoxiesToEdition(props.data.entry);

	return <Home episodes={props.episodes} boxies={boxies} />;
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
	const queryResult: { entry: HomePageTypes } = await client.request(homePageQuery);

	const nav: NavInterface = await client.request(NavQuery);
	const header = await client.request(headerQuery);
	const footer = await client.request(footerQuery);

	const updatedData = await updateAllImages(queryResult, await updateImage);
	const episodes = await getSpotifyEpisodes();

	return {
		props: {
			data: await resolveAllPromisesDeep(updatedData),
			episodes,
			nav,
			header,
			footer,
		},
		revalidate: 1,
	};
};
