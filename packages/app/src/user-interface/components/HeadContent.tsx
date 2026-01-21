import * as React from "react";

import Head from "next/head";

import { ContentPagesEntry, HomePageTypes } from "@/gql/entrytype.gql";
import { EtherSeoData } from "@/gql/fields.gql";

// TODO: Add favicon
// import favicon from "@/public/";

function HeadContent({
	title = "",
	description = "",
	social = undefined,
	page,
}: EtherSeoData & {
	page: HomePageTypes | ContentPagesEntry;
}): JSX.Element {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={social?.facebook?.title} />
			<meta property="og:image" content={social?.facebook?.image?.url} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={title} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:url" content={page?.url || ""} />

			{/* TODO: How do these meta tags get used? */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@" />
			<meta name="twitter:url" content="" />
			<meta name="twitter:title" content={social?.twitter?.title} />
			<meta
				name="twitter:description"
				content={social?.twitter?.description}
			/>
			<meta name="twitter:image" content={social?.twitter?.image?.url} />
			{/* TODO: Add favicon */}
			{/* <link rel="shortcut icon" type="image/ico" href={favicon.src}></link> */}
		</Head>
	);
}

export default HeadContent;
