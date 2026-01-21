import React from "react";

import Image from "next/image";
import Link from "next/link";

import { v4 as uuidv4 } from "uuid";

import { cn } from "@/client/utils/cn";

import Action from "./Action";
import { CopyBlockContainer, CopyText, StrongText, SubText } from "./CopyBlock";
import CTABlock from "./CTABlock";

const ContentBlocks = ({ data }: { data: any }) => {
	const { contentBlocks } = data;

	function groupAssociatedFields(arr) {
		let result = [];
		let ctaGroup = []; // This will store consecutive "cta" objects

		for (let i = 0; i < arr?.length; i++) {
			let currentBlock = arr[i];

			switch (currentBlock.typeHandle) {
				case "callToAction":
					// Add current block to the group of "priceCard"
					ctaGroup.push(currentBlock);
					break;
				default:
					// Break up cta group
					if (ctaGroup.length > 1) {
						result.push({ callsToAction: [...ctaGroup] });
						ctaGroup = [];
					} else if (ctaGroup.length === 1) {
						result.push(ctaGroup[0]);
						ctaGroup = [];
					}

					// Push the non-groupable block
					result.push(currentBlock);
			}
		}

		if (ctaGroup.length > 1) {
			result.push({ callsToAction: [...ctaGroup] });
		} else if (ctaGroup.length === 1) {
			result.push(ctaGroup[0]);
		}

		return result;
	}

	return (
		<div className="mb-16">
			{groupAssociatedFields(contentBlocks).map((block, i) => {
				if (block.callsToAction) {
					return (
						<div key={uuidv4()}>
							{block.callsToAction.map((cta, i) => {
								if (!cta.enabled) return null;

								return <CTABlock block={cta} order={i} />;
							})}
						</div>
					);
				}

				if (!block.enabled) return null;

				switch (block.typeHandle) {
					case "copyBlock":
						return (
							<CopyBlockContainer key={block.title}>
								<StrongText>{block.title}</StrongText>
								{!!block.subhead && <SubText>{block.subhead}</SubText>}
								<CopyText>{block.copy}</CopyText>
								{!!block.button?.length && (
									<Action
										button={block.button[0]}
										className="mx-auto mt-2 lg:ml-0 button red-to-black"
									/>
								)}
							</CopyBlockContainer>
						);
					// case "imageBlock":
					// 	if (!block.images?.length) return null;
					// 	return (
					// 		<ImageBlocks
					// 			images={block.images}
					// 			key={"imageBlock" + i}
					// 		/>
					// 	);
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
