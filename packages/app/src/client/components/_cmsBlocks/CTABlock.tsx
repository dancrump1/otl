import React from "react";

import Image from "next/image";

import { v4 as uuidv4 } from "uuid";

import { cn } from "@/client/utils/cn";
import Action from "./Action";
import { CopyText } from "./CopyBlock";

const CTABlock = ({ block, order }) => {
	return (
		<div
			className={cn(
				"flex-col justify-between flex py-16 xl:py-40",
				block.background ? "bg-backgroundSecondary text-white" : ""
			)}
			key={uuidv4()}
		>
			<div
				className={cn(
					"mx-[10%] flex flex-col gap-6 lg:gap-36",
					`${!!(order % 2) ? "lg:flex-row-reverse" : "lg:flex-row"}`
				)}
			>
				<div className="lg:hidden">
					{block.title && <h2 className="">{block.title}</h2>}
					{block.subhead && <h3 className="">{block.subhead}</h3>}
				</div>
				{!!block.images && !!block.images.length && (
					<div className="lg:basis-1/2">
						<Image
							src={block.images[0].url}
							alt={block.images[0]?.alt || block.images[0].title}
							width={block.images[0].width || ""}
							height={block.images[0].height || ""}
							className="w-full cta-img-sm max-h-[75vh] object-cover"
							style={
								block.images[0].focalPoint
									? {
											objectPosition: `${
												block.images[0].focalPoint[0] * 100
											}% ${block.images[0].focalPoint[1] * 100}%`,
									  }
									: {}
							}
						/>
					</div>
				)}

				<div className="flex flex-col lg:basis-1/2">
					{block.title && (
						<h2 className="hidden lg:block mb-6">{block.title}</h2>
					)}
					{block.subhead && (
						<h3 className="hidden lg:block mb-6">{block.subhead}</h3>
					)}
					{block.copy && (
						<CopyText className="text-balance">{block.copy}</CopyText>
					)}
					{!!block.button?.length && (
						<Action
							button={block.button[0]}
							className={`mx-auto mt-2 lg:ml-0 button ${
								block.background ? "red-to-white" : "red-to-black"
							}`}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default CTABlock;
