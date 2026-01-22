import React from "react";

import { cn } from "@/user-interface/client-utils/cn";

import ImageComponent from "../ImageComponent";
import Action from "./Action";
import { CopyText } from "./CopyBlock";

const CTABlock = ({ block, order }: { block: any; order: number }) => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div
				className={cn(
					"flex flex-col gap-8 lg:gap-12",
					`${!!(order % 2) ? "lg:flex-row-reverse" : "lg:flex-row"}`
				)}
			>
				{!!block.images && !!block.images.length && (
					<div className="lg:basis-1/2">
						<div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
							<ImageComponent
								image={block.images[0]}
								className="object-cover"
								width={block.images[0].width || 800}
								height={block.images[0].height || 600}
							/>
						</div>
					</div>
				)}

				<div className="flex flex-col justify-center lg:basis-1/2 space-y-6">
					{block.title && (
						<h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
							{block.title}
						</h2>
					)}
					{block.subhead && (
						<h3 className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium">
							{block.subhead}
						</h3>
					)}
					{block.copy && (
						<div className="prose prose-lg dark:prose-invert max-w-none">
							<CopyText className="text-zinc-700 dark:text-zinc-300">
								{block.copy}
							</CopyText>
						</div>
					)}
					{!!block.button?.length && (
						<div className="pt-2">
							<Action
								button={block.button[0]}
								className="inline-flex items-center justify-center rounded-lg bg-zinc-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 shadow-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white transition-colors"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CTABlock;
