"use client";

import React from "react";

import ContentBlocks from "../components/_cmsBlocks/ContentBlocks";
import FAQ from "../components/_cmsBlocks/FAQ";
import Hero from "../components/_cmsBlocks/Hero";

function ContentPage({ data }) {
	const { entry } = data;

	return (
		<main>
			<Hero
				text={entry?.title}
				image={entry?.hero?.find((asset) => !asset.embeddedAsset)}
				video={
					entry.hero?.find((asset) => !!asset.embeddedAsset)?.embeddedAsset
				}
			/>
			<ContentBlocks
				data={entry}
				events={data?.solspace_calendar?.events}
				articles={data?.articlesEntries}
			/>

			<section className="cont-page mt-16">
				{entry?.faq && <FAQ faq={entry.faq} />}
			</section>
		</main>
	);
}

export default ContentPage;
