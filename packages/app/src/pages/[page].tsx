import React from "react";

import { GetStaticPaths, GetStaticProps } from "next";

import { pageQueries } from "@/gql/page.gql";
import cmsClient from "@/helpers/cmsClient";
import getPreviewToken from "@/helpers/getPreviewToken";

import ContentPage from "@/client/layouts/ContentPage";
import Layout from "@/client/layouts/Layout";

function Page(props): JSX.Element {
	return <ContentPage data={props.data} />;
}

Page.getLayout = function getLayout(page) {
	const pageProps = page.props;

	let seo;

	if (pageProps.data?.entry?.seo) {
		seo = pageProps.data.entry.seo;
	}

	return <Layout pageProps={pageProps}>{page}</Layout>;
};

export default Page;

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	// if we are in preview mode, get the token from the previewData
	const { token, typeHandle } = getPreviewToken(
		preview,
		previewData as {
			token: string;
			typeHandle: string;
		}
	);
	const client = cmsClient(preview, token);

	const page = params?.page.replace("/", "");

	const query = pageQueries[page] || pageQueries.contentPage;

	let data;

	try {
		data = await client.request(query, { uri: page });
	} catch (err) {
		return { notFound: true };
	}

	// If entry has been deleted, show 404
	if (!data.entry?.title) {
		return { notFound: true };
	}

	return {
		props: {
			page,
			data,
		},
		// Next.js will invalidate the cache when a
		// request comes in, at most once every 3600 seconds.
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const client = cmsClient();
	const { entries } = await client.request(pageQueries.pages);

	const paths = entries
		.map((entry) =>
			entry.uri?.split("/")?.length > 1
				? entry.uri?.split("/")?.[1] || ""
				: entry.uri || ""
		)
		.filter((item) => !!item || item.includes("home"));

	return {
		paths: paths.map((page) => {
			return {
				params: {
					page,
				},
			};
		}),
		fallback: "blocking",
	};
};
