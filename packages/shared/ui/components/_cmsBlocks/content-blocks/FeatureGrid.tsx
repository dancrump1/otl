import React from "react";

import { cn } from "@shared/client-utils/cn";
import { FeaturesGridTypes } from "@shared/gql/fields.gql";

import ImageComponent from "../../Image";
import { CopyText } from "./CopyBlock";

const FeatureGrid = ({ block }: { block: FeaturesGridTypes }) => {
	return (
		<section className="cont-page my-16 md:my-24">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-4 md:col-span-1">
					<div
						className={cn(
							"bg-primary text-secondary break-inside-avoid-column mb-4 flex flex-col"
						)}
					>
						<div className="p-8 flex flex-col gap-4">
							<h6 className="text-gold">{block.featureGrid[0].title}</h6>
							<CopyText>{block.featureGrid[0].copy}</CopyText>
						</div>
						{!!block.featureGrid[0].images?.length && (
							<ImageComponent image={block.featureGrid[0].images[0]} />
						)}
					</div>
					<div
						className={cn(
							"bg-primary text-secondary break-inside-avoid-column flex flex-col"
						)}
					>
						<div className="p-8 flex flex-col gap-4">
							<h6 className="text-gold">{block.featureGrid[1].title}</h6>
							<CopyText>{block.featureGrid[1].copy}</CopyText>
						</div>
						{!!block.featureGrid[1].images?.length && (
							<ImageComponent image={block.featureGrid[1].images[0]} />
						)}
					</div>
				</div>

				<div
					className={cn(
						"bg-primary text-secondary break-inside-avoid-column md:col-span-1 flex flex-col"
					)}
				>
					<div className="p-8  flex flex-col gap-4">
						<h6 className="text-gold">{block.featureGrid[2].title}</h6>
						<CopyText>{block.featureGrid[2].copy}</CopyText>
					</div>
					{!!block.featureGrid[2].images?.length && (
						<ImageComponent image={block.featureGrid[2].images[0]} />
					)}
				</div>
			</div>
		</section>
	);
};

export default FeatureGrid;
