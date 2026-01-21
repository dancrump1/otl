import React from "react";

import { GetStaticProps } from "next";

import { pageQueries } from "@/gql/page.gql";
import cmsClient from "@/helpers/cmsClient";

import Home from "@/client/layouts/Home";
import Layout from "@/client/layouts/Layout";

export interface IPageProps {
	[k: string]: any;
}

function Index(props: { data: any }): JSX.Element {
	return <Home data={props.data} />;
}

Index.getLayout = function getLayout(page) {
	const pageProps = page.props;

	return <Layout pageProps={pageProps}>{page}</Layout>;
};

export default Index;

export const getStaticProps: GetStaticProps = async ({
	params,
	preview,
	previewData,
}) => {
	const client = cmsClient(preview, previewData?.token);
	const data: any = await client.request(pageQueries.home);

	return {
		props: {
			data,
		},
		// Next.js will invalidate the cache when a
		// request comes in, at most once every 60 seconds.
		revalidate: 3600,
	};
};
