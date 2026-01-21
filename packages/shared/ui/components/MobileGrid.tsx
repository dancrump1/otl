import React from "react";

import { ImageGridTypes } from "@shared/gql/fields.gql";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./Carousel";
import ImageComponent from "./Image";

const ImageGrid = ({
	block,
	className,
}: {
	block: ImageGridTypes;
	className?: string;
}) => {
	// Image field is optional in CMS, show nothing if no image
	if (!block.gridImages) return null;

	if (block.gridImages.length === 1) {
		return (
			<ImageComponent image={block.gridImages?.[0]} className={className} />
		);
	}

	return (
		<div className="md:hidden block mb-20">
			<Carousel
				opts={{
					loop: true,
				}}
			>
				<CarouselContent>
					{block.gridImages?.map((img, i) => {
						return (
							<CarouselItem
								className="basis-full h-[66vh]"
								key={img.title + "carousel"}
							>
								<ImageComponent image={img} />
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselNext className="z-10 -bottom-20 right-[25%] sm:right-[30%] md:right-[43%] rounded-full text-primary border-primary h-12 w-12" />
				<CarouselPrevious className="z-10 -bottom-20 left-[25%] sm:left-[30%] md:left-[43%] rounded-full text-primary border-primary h-12 w-12" />
			</Carousel>
		</div>
	);
};

export default ImageGrid;
