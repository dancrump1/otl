import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";

import { AllContentPages, pageQueries } from "@/gql/entrytype.gql";
import { ContentBlocksTypes } from "@/gql/fields.gql";
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
import ContentPage from "@/user-interface/layouts/ContentPage";
import Layout from "@/user-interface/layouts/Layout";

function Page(props: any): JSX.Element {
	return <ContentPage data={props.data} />;
}

Page.getLayout = function getLayout(page: any) {
	const pageProps = page.props;

	return <Layout pageProps={pageProps}>{page}</Layout>;
};

export default Page;

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	const client = cmsClient(
		preview,
		typeof previewData === "string" || previewData === false
			? previewData
			: (previewData as { token?: string })?.token
	);

	const pageString =
		typeof params?.page === "string" ? params?.page : params?.page?.[0];

	const page = pageString?.replace("/", "");

	const query =
		pageQueries[page as keyof typeof pageQueries] || pageQueries.contentPage;

	let data: { entry: ContentBlocksTypes };

	try {
		data = await client.request(query, { uri: page });
	} catch (err) {
		return { notFound: true };
	}

	// If entry has been deleted, show 404
	if (!data.entry?.title) {
		return { notFound: true };
	}

	const nav: NavInterface = await client.request(NavQuery);
	const header = await client.request(headerQuery);
	const footer = await client.request(footerQuery);

	const updatedData = await updateAllImages(data, await updateImage);

	return {
		props: {
			page,
			data: await resolveAllPromisesDeep(updatedData),
			nav,
			header,
			footer,
		},
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const client = cmsClient();

	// TODO STARTUP: Ensure this captures all generic pages
	const { contentPagesEntries } = await client.request(pageQueries.pages);

	const paths = contentPagesEntries
		.map((entry: AllContentPages) =>
			entry.uri?.split("/")?.length > 1
				? entry.uri?.split("/")?.[1] || ""
				: entry.uri || ""
		)
		.filter((item: string) => !!item || item.includes("home"));

	return {
		paths: paths.map((page: { params: { page: string } }) => {
			return {
				params: {
					page,
				},
			};
		}),
		fallback: "blocking",
	};
};
