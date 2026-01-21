import * as React from "react";

import Head from "next/head";

import {
	ContentPagesEntry,
	HomePageTypes,
	siteNameInn,
} from "@shared/gql/entrytype.gql";
import { EtherSeoData } from "@shared/gql/fields.gql";

// import favicon from "@shared/public/";

function HeadContent({
	title = "",
	description = "",
	social = undefined,
	page,
	site,
}: EtherSeoData & {
	page: HomePageTypes | ContentPagesEntry;
	site: string;
}): JSX.Element {
	let defaultData;

	// CMS default value is '' which converts to &#039;&#039
	if (!title.replace(/'/g, "").replace(/&#039/g, "").replace(/;/g, "")) {
		site === siteNameInn
			? (defaultData = {
					title: page?.title + " - New England Inn",
			  })
			: (defaultData = {
					title: page?.title + " - Tuckerman's Restaurant & Tavern ",
			  });
	}

	return (
		<Head>
			<title>{defaultData?.title || title}</title>
			<meta name="description" content={description} />

			<meta property="og:url" content={page?.url || ""} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={social?.facebook?.title} />
			<meta property="og:image" content={social?.facebook?.image?.url} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta
				property="og:description"
				content={social?.facebook?.description}
			/>
			<meta property="og:site_name" content="" />
			<meta property="og:locale" content="en_US" />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@" />
			<meta name="twitter:url" content="" />
			<meta name="twitter:title" content={social?.twitter?.title} />
			<meta
				name="twitter:description"
				content={social?.twitter?.description}
			/>
			<meta name="twitter:image" content={social?.twitter?.image?.url} />
			{/* <link rel="shortcut icon" type="image/ico" href={favicon.src}></link> */}

			{/* Custom Slider  */}
			<link
				rel="stylesheet"
				type="text/css"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
			/>
		</Head>
	);
}

export default HeadContent;
