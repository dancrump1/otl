import React from "react";

import { cn } from "@shared/client-utils/cn";
import { CallToActionTypes } from "@shared/gql/fields.gql";
import { Fade, Slide } from "react-awesome-reveal";

import ImageComponent from "../../Image";
import Action from "../Action";
import { CopyText } from "./CopyBlock";

const CTABlock = ({
	block,
	consecutiveFirst,
	consecutiveMiddle,
	consecutiveLast,
}: {
	block: CallToActionTypes;
	consecutiveFirst: boolean;
	consecutiveMiddle: boolean;
	consecutiveLast: boolean;
}) => {
	const hasBackground = !block.backgroundColor;
	return (
		<section
			className={cn(
				"w-full h-full flex",
				hasBackground && "bg-background-secondary"
			)}
		>
			<div
				className={cn(
					"justify-between flex flex-col6 w-full cont-page py-20 md:py-24",
					consecutiveFirst && "!pb-10 !pt-16 md:!pb-16 md:!pt-24",
					consecutiveMiddle && "!pb-10 !pt-10 md:!pb-16 md:!pt-16",
					consecutiveLast && "!pb-16 !pt-10 md:!pb-24 md:!pt-10"
				)}
			>
				<Slide triggerOnce direction="up">
					<Fade triggerOnce>
						{!!block.images && !!block.images.length && (
							<div className="flex flex-wrap gap-6">
								{block.images.map((image) => (
									<ImageComponent
										image={image}
										className={`object-cover h-[25vh] md:h-[50vh] ${
											!!block.images &&
											!!block.images.length &&
											block.images.length > 1 &&
											"md:w-[calc(50%-1.5rem)]"
										}`}
									/>
								))}
							</div>
						)}

						<div>
							{block.title && block?.toggle && (
								<h2 className={`${hasBackground && "text-gold"}`}>
									{block.title}
								</h2>
							)}

							{block.copy && (
								<CopyText
									className={`mt-4 text-pretty ${
										hasBackground && "text-secondary"
									}`}
								>
									{block.copy}
								</CopyText>
							)}
							{!!block.button?.length && (
								<div className="mt-6">
									<Action
										button={block.button[0]}
										className={`button ${
											!hasBackground ? "primary" : "secondary"
										}`}
									/>
								</div>
							)}
						</div>
					</Fade>
				</Slide>
			</div>
		</section>
	);
};

export default CTABlock;
