import React from "react";

import { ContentPagesEntry, HomePageTypes } from "@/gql/entrytype.gql";
import { v4 as uuidv4 } from "uuid";

import ImageComponent from "../ImageComponent";
import Action from "./Action";
import { CopyText } from "./CopyBlock";
import CTABlock from "./CTABlock";

/**
 * Content Blocks
 * @param data page data containing content blocks
 *
 * @returns an Custom Component for each typeHandle type.
 * To add a new content block, add a new type to the CMS content block, add a case matching the type to this switch
 * Ensure a type is added to ContentPagesEntry (which extends BaseEntryTypeTypes which contains the contentBlocks)
 */

const ContentBlocks = ({ data }: { data: ContentPagesEntry | HomePageTypes }) => {
	const { contentBlocks } = data;

	return (
		<div className="space-y-16 md:space-y-24">
			{contentBlocks
				?.filter((block) => !!block.enabled)
				.map((block, i) => {
					switch (block.typeHandle) {
						case "copyBlock":
							return (
								<section
									key={block.title || block.uid}
									className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
								>
									<div className="text-center space-y-6">
										{block.title && (
											<h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
												{block.title}
											</h2>
										)}
										{!!block?.headline && (
											<h3 className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium">
												{block.headline}
											</h3>
										)}
										{block.copy && (
											<div className="prose prose-lg dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
												<CopyText>{block.copy}</CopyText>
											</div>
										)}
										{!!block.button?.length && (
											<div className="pt-4">
												<Action
													button={block.button[0]}
													className="inline-flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white transition-colors"
												/>
											</div>
										)}
									</div>
								</section>
							);
						case "callToAction":
							return (
								<section
									key={block.uid || uuidv4()}
									className={`${
										(block as any).background
											? "bg-zinc-100 dark:bg-zinc-800"
											: "bg-white dark:bg-zinc-950"
									} py-16 md:py-24`}
								>
									<CTABlock block={block} order={i} />
								</section>
							);
						case "embedCode":
							return (
								<section
									key={uuidv4()}
									className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
								>
									<div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800">
										<iframe
											src={block.embedUrl}
											className="absolute inset-0 w-full h-full"
											allowFullScreen
											title="Embedded content"
										/>
									</div>
								</section>
							);
						case "imageBlock":
							const imageBlock = block as any;
							return (
								<section
									key={block.uid || uuidv4()}
									className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{(imageBlock.images || imageBlock.image)?.map((image: any, idx: number) => (
											<div
												key={image.uid || idx}
												className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
											>
												<ImageComponent
													image={image}
													className="object-cover"
													width={image.width || 600}
													height={image.height || 600}
												/>
											</div>
										))}
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
