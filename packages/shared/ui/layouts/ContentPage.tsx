"use client";

import React from "react";

import { ContentPagesEntry } from "@shared/gql/entrytype.gql";
import ContentBlocks from "@shared/ui/components/_cmsBlocks/ContentBlocks";
import Hero from "@shared/ui/components/_cmsBlocks/Hero";

import FAQ from "../components/FAQ";

function ContentPage({ data }: { data: ContentPagesEntry }) {
	return (
		<main className="text-primary">
			<Hero
				text={data?.headline}
				image={data?.hero?.find((asset) => !asset.embeddedAsset)}
				video={
					data?.hero?.find((asset) => !!asset.embeddedAsset)?.embeddedAsset
				}
			/>
			{!!data?.contentBlocks && <ContentBlocks data={data} />}
			{!!data?.faq?.length && <FAQ data={data.faq} />}
		</main>
	);
}

export default ContentPage;
