"use client";

import React from "react";

import { ContentPagesEntry } from "@/gql/entrytype.gql";

import ContentBlocks from "../components/_cmsBlocks/ContentBlocks";
import Hero from "../components/_cmsBlocks/Hero";

function ContentPage({ data }: { data: { entry: ContentPagesEntry } }) {
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
			<ContentBlocks data={entry} />
		</main>
	);
}

export default ContentPage;
