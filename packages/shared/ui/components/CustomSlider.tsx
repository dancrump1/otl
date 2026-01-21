import React from "react";

import useDeviceDetection from "@shared/client-utils/useIsMobile";
import {
	DestinationEntryTypes,
	RecommendationsBlockTypes,
} from "@shared/gql/fields.gql";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Slider from "react-slick";

import Action from "./_cmsBlocks/Action";
import { CopyText } from "./_cmsBlocks/content-blocks/CopyBlock";
import { Button } from "./Button";
import ImageComponent from "./Image";

function CustomSlider({ data }: { data: RecommendationsBlockTypes }) {
	const isMobile = useDeviceDetection();

	const settings = {
		arrows: true,
		dots: false,
		focusOnSelect: true,
		infinite: true,
		slidesToShow: 3.5,
		swipeToSlide: isMobile,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		initialSlide: 1,
		responsive: [
			{
				breakpoint: 821,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					initialSlide: 0,
				},
			},
		],
	};

	return (
		<section className="cont-page carousel-container my-16 md:my-24">
			{data.toggle && <h2>{data.title}</h2>}
			<div className="text-red-500">{isMobile.toString()}</div>
			<CopyText className="mb-8">{data.copy}</CopyText>
			<Slider {...settings}>
				{data.recommendations?.map(({ images, ...rest }, i) => {
					if (!images?.length) return null;
					return (
						<div key={"recommendation" + i}>
							<motion.div
								key={"recommendation" + i + "content"}
								className="mx-2 sm:mx-4 transition-all"
							>
								<Content i={i} images={images} {...rest} />
							</motion.div>
						</div>
					);
				})}
			</Slider>
		</section>
	);
}
const Content = ({
	images,
	images2,
	title,
	copy,
	button,
	i,
}: DestinationEntryTypes & { i: number }) => {
	return (
		<div className="relative">
			{!!images?.length && (
				<ImageComponent className="aspect-[3/4]" image={images[0]} />
			)}
			{/* Icon  */}
			{!!images2?.length && (
				<ImageComponent
					image={images2[0]}
					className="absolute top-2 right-2 h-8 w-8"
				/>
			)}
			<h3 className="mt-6 mb-2">{title}</h3>
			<div className="content opacity-0 transition-opacity">
				<CopyText className="text-[16px]">{copy}</CopyText>
				{!!button?.length && (
					<Action
						className="text-[16px] font-semibold"
						button={button?.[0]}
					/>
				)}
			</div>
		</div>
	);
};

function NextArrow(props: any) {
	const { onClick } = props;
	return (
		<Button
			className="z-20 absolute h-12 w-12 border rounded-full border-primary -mb-8 sm:mb-0 bottom-0 right-[25%] sm:right-[35%] lg:right-[43%]"
			variant="outline"
			size="icon"
			onClick={onClick}
		>
			<IconChevronRight className="h-8 w-8 text-primary" />
			<span className="sr-only">Next slide</span>
		</Button>
	);
}

function PrevArrow(props: any) {
	const { onClick } = props;
	return (
		<Button
			className="z-20 absolute h-12 w-12 border rounded-full border-primary -mb-8 sm:mb-0 bottom-0 left-[25%] sm:left-[30%] md:left-[43%]"
			variant="outline"
			size="icon"
			onClick={onClick}
		>
			<IconChevronLeft className="h-8 w-8 text-primary" />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
}

export { CustomSlider, Content, NextArrow, PrevArrow };
