import React from "react";

import { ContentPagesEntry } from "@/gql/entrytype.gql";
import { v4 as uuidv4 } from "uuid";

import Action from "./Action";
import { CopyBlockContainer, CopyText, StrongText, SubText } from "./CopyBlock";
import CTABlock from "./CTABlock";

/**
 * Content Blocks
 * @param data page data containing content blocks
 *
 * @returns an Custom Component for each typeHandle type.
 * To add a new content block, add a new type to the CMS content block, add a case matching the type to this switch
 * Ensure a type is added to ContentPagesEntry (which extends BaseEntryTypeTypes which contains the contentBlocks)
 */

const ContentBlocks = ({ data }: { data: ContentPagesEntry }) => {
	const { contentBlocks } = data;

	return (
		<div className="mb-16">
			{contentBlocks
				.filter((block) => !!block.enabled)
				.map((block, i) => {
					switch (block.typeHandle) {
						case "copyBlock":
							return (
								<CopyBlockContainer key={block.title}>
									<StrongText>{block.title}</StrongText>
									{!!block?.headline && (
										<SubText>{block.headline}</SubText>
									)}
									<CopyText>{block.copy}</CopyText>
									{!!block.button?.length && (
										<Action
											button={block.button[0]}
											className="mx-auto mt-2 lg:ml-0 button red-to-black"
										/>
									)}
								</CopyBlockContainer>
							);
						case "callToAction":
							return <CTABlock block={block} order={i} />;
						case "embedCode":
							return (
								<section className="my-24 cont-page" key={uuidv4()}>
									<div className="embedWrapper">
										<iframe
											src={block.embedUrl}
											width="800px"
											height="450px"
											allowFullScreen
										></iframe>
									</div>
								</section>
							);
						default:
							return null;
					}
				})}
		</div>
	);
};

export default ContentBlocks;
