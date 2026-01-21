"use client";

import React from "react";

import { cn } from "@shared/client-utils/cn";
import { StickyCTATypes } from "@shared/gql/fields.gql";

import Action from "./_cmsBlocks/Action";
import { CopyText } from "./_cmsBlocks/content-blocks/CopyBlock";
import ImageComponent from "./Image";

export const StickyScroll = ({
	content,
	contentClassName,
}: {
	content: StickyCTATypes;
	contentClassName?: string;
}) => {
	return (
		<div className="cont-page relative flex flex-col md:flex-row gap-8 justify-center rounded-md py-12 md:py-32 place-items-center md:place-items-start lg:gap-20">
			<div
				className={cn(
					"relative md:sticky md:top-[15%] lg:top-[15%] h-fit max-w-[80ch] rounded-md",
					contentClassName
				)}
			>
				<CopyText className="[&>*]:text-pretty">{content.copy}</CopyText>
				<Action
					button={content.button[0]}
					className="my-2 lg:my-0 button primary"
				/>
			</div>
			<div className="relative flex items-start px-4 min-w-[100vw] md:min-w-72 lg:min-w-96">
				<div className="flex gap-12 flex-col w-full h-fit">
					{content.accommodations.map((image) => (
						<div
							className="h-full w-full flex flex-col"
							key={
								"sticky-scroll" +
								(image.alt || image.title || image.uid)
							}
						>
							<ImageComponent
								width={800}
								height={800}
								image={image}
								className="max-h-[385px] aspect-[3/4] md:max-h-[485px]"
							/>
							<span className="block text-primary text-[24px] font-semibold mt-4">
								{image.title}
							</span>
							<CopyText className="[&_*]:text-pretty [&_*]:!text-sm">
								{image.copy}
							</CopyText>
						</div>
					))}

					{/* Div for spacing on scroll window */}
					<div className="hidden md:block h-40" />
				</div>
			</div>
		</div>
	);
};
