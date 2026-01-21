import React from "react";

import { Fade, Slide } from "react-awesome-reveal";

import { ContentPagesEntry } from "../../../gql/entrytype.gql";
import HorizontalGrid from "../HorizontalGrid";
import ImageComponent from "../Image";
import { StickyScroll } from "../StickyScroll";
import VerticalGrid from "../VerticalGrid";
import Action from "./Action";
import { CopyBlockContainer, CopyText } from "./content-blocks/CopyBlock";
import CTABlock from "./content-blocks/CTABlock";
import EmbedCodeBlock from "./content-blocks/EmbedCodeBlock";
import FeatureGrid from "./content-blocks/FeatureGrid";
import PackagesBlock from "./content-blocks/PackagesBlock";
import RecommendationsBlock from "./content-blocks/RecommendationsBlock";

const ContentBlocks = ({ data }: { data: ContentPagesEntry }) => {
	const { contentBlocks } = data;
	const enabledBlock = contentBlocks.filter((block) => !!block.enabled);

	return enabledBlock.map((block, i) => {
		switch (block.typeHandle) {
			case "copyBlock":
				return (
					<section className="my-6">
						<Slide triggerOnce direction="up">
							<Fade triggerOnce>
								<CopyBlockContainer key={"copyBlock" + block.title}>
									<CopyText className="max-w-[800px] mx-auto">
										{block.copy}
									</CopyText>
									{!!block.button?.length && (
										<Action
											button={block.button[0]}
											className="button primary"
										/>
									)}
								</CopyBlockContainer>
							</Fade>
						</Slide>
					</section>
				);
			case "callToAction":
				return (
					<CTABlock
						block={block}
						key={"callToAction" + block.title}
						consecutiveFirst={
							enabledBlock[i + 1]?.typeHandle === "callToAction" &&
							enabledBlock[i - 1]?.typeHandle !== "callToAction"
						}
						consecutiveMiddle={
							enabledBlock[i + 1]?.typeHandle === "callToAction" &&
							enabledBlock[i - 1]?.typeHandle === "callToAction"
						}
						consecutiveLast={
							enabledBlock[i - 1]?.typeHandle === "callToAction" &&
							enabledBlock[i + 1]?.typeHandle !== "callToAction"
						}
					/>
				);
			case "embedCode":
				return (
					<Slide triggerOnce direction="up">
						<Fade triggerOnce>
							<EmbedCodeBlock block={block} key={block.embedUrl} />
						</Fade>
					</Slide>
				);
			case "imageBlock":
				return (
					<section
						className="cont-page flex flex-col overflow-hidden my-16"
						key={"imageBlock" + block.title}
					>
						{block.title && block?.toggle && <h2>{block.title}</h2>}
						{!!block.images?.length && (
							<ImageComponent image={block.images?.[0]} />
						)}
					</section>
				);
			case "imageGrid":
				return (
					<section
						className="cont-page flex flex-col overflow-hidden items-center my-6"
						key={"imageGrid" + block.title}
					>
						{block.gridToggle ? (
							<VerticalGrid
								block={block}
								key={"imageBlock" + block.title}
								className=""
							/>
						) : (
							<HorizontalGrid
								block={block}
								key={"imageBlock" + block.title}
								className=""
							/>
						)}
					</section>
				);
			case "stickyCTA":
				return (
					<StickyScroll content={block} key={block.title || block.uid} />
				);
			case "packagesBlock":
				return (
					<PackagesBlock block={block} key={block.title || block.uid} />
				);
			case "recommendationsBlock":
				return (
					<RecommendationsBlock
						block={block}
						key={block.title || block.uid}
					/>
				);
			case "featureGrid":
				return <FeatureGrid block={block} />;
			default:
				return null;
		}
	});
};

export default ContentBlocks;
