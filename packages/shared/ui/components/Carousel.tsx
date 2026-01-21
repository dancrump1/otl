"use client";

import React, {
	ComponentProps,
	createContext,
	forwardRef,
	HTMLAttributes,
	KeyboardEvent,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

import { cn } from "@shared/client-utils/cn";
import {
	DestinationEntryTypes,
	RecommendationsBlockTypes,
} from "@shared/gql/fields.gql";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react";
import { motion } from "motion/react";

import Action from "./_cmsBlocks/Action";
import { CopyText } from "./_cmsBlocks/content-blocks/CopyBlock";
import { Button } from "./Button";
import ImageComponent from "./Image";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: "horizontal" | "vertical";
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = useContext(CarouselContext);

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />");
	}

	return context;
}

const Carousel = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = "horizontal",
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === "horizontal" ? "x" : "y",
			},
			plugins
		);
		const [canScrollPrev, setCanScrollPrev] = useState(false);
		const [canScrollNext, setCanScrollNext] = useState(false);

		const onSelect = useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}

			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const scrollPrev = useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollNext = useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.key === "ArrowLeft") {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === "ArrowRight") {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext]
		);

		useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		useEffect(() => {
			if (!api) {
				return;
			}

			onSelect(api);
			api.on("reInit", onSelect);
			api.on("select", onSelect);

			return () => {
				api?.off("select", onSelect);
			};
		}, [api, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api: api,
					opts,
					orientation:
						orientation ||
						(opts?.axis === "y" ? "vertical" : "horizontal"),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
				}}
			>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn("relative", className)}
					role="region"
					aria-roledescription="carousel"
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	}
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className="overflow-hidden pt-20">
			<div
				ref={ref}
				className={cn(
					"flex justify-evenly gap-8 relative",
					// orientation === "horizontal" ? "lg:-ml-4" : "-mt-4 flex-col",
					className
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { orientation } = useCarousel();

		return (
			<div
				ref={ref}
				role="group"
				aria-roledescription="slide"
				className={cn(
					"min-w-0 shrink-0 grow-0 basis-full",
					orientation === "horizontal" ? "lg:pl-4" : "pt-4",
					className
				)}
				{...props}
			/>
		);
	}
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = forwardRef<
	HTMLButtonElement,
	ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn("absolute h-12 w-12 rounded-full", className)}
			// disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<IconChevronLeft className="h-8 w-8" />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<
	HTMLButtonElement,
	ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn("absolute h-12 w-12 rounded-full", className)}
			// disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<IconChevronRight className="h-8 w-8" />
			<span className="sr-only">Next slide</span>
		</Button>
	);
});
CarouselNext.displayName = "CarouselNext";

const CustomCarousel = ({ data }: { data: RecommendationsBlockTypes }) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [size, setSize] = useState(0);

	const [useCarousel, setUseCarousel] = useState(false);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	useEffect(() => {
		if (!api) return;

		if (
			data.recommendations &&
			api.scrollSnapList().length + 1 > data.recommendations?.length
		) {
			setUseCarousel(true);
		} else {
			setUseCarousel(false);
		}
	}, [size, api]);

	return (
		<section className="cont-page carousel-container my-16 md:my-24">
			{data.toggle && <h2>{data.title}</h2>}
			<CopyText>{data.copy}</CopyText>

			<Carousel
				className={cn("w-full mt-10", !useCarousel && "absolute opacity-0")}
				orientation="horizontal"
				opts={{
					loop: true,
					align: (viewSize) => {
						setSize(viewSize);
						return viewSize >= 924 ? viewSize / 4 : 0;
					},
				}}
				setApi={setApi}
			>
				<CarouselContent>
					{data.recommendations?.map(({ images, ...rest }, i) => {
						if (!images?.length) return null;
						// TODO: Is it possible to make all slides the same height so the arrows don't move up and down?
						return (
							<CarouselItem
								className="basis-full md:basis-[40%] lg:basis-[29%] h-fit"
								key={"recommendation" + i}
							>
								<motion.div
									key={"recommendation" + i + "content"}
									className={cn("relative")}
									animate={
										current === i + 1
											? { translateY: "-80px" }
											: { translateY: 0 }
									}
								>
									<Content
										current={current}
										i={i}
										images={images}
										{...rest}
									/>
								</motion.div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
				<CarouselNext className="z-10 bottom-0 right-[25%] sm:right-[30%] md:right-[43%] rounded-full border-primary h-12 w-12" />
				<CarouselPrevious className="z-10 bottom-0 left-[25%] sm:left-[30%] md:left-[43%] rounded-full border-primary h-12 w-12" />
			</Carousel>
			{!useCarousel && (
				<div className={cn("w-full mt-10 flex gap-10")}>
					{data.recommendations?.map(({ images, ...rest }, i) => {
						if (!images?.length) return null;
						// TODO: Is it possible to make all slides the same height so the arrows don't move up and down?
						return (
							<div
								key={"recommendation" + i + "content"}
								className="flex-1 relative"
							>
								<Content
									current={undefined}
									i={i}
									images={images}
									{...rest}
								/>
							</div>
						);
					})}
				</div>
			)}
		</section>
	);
};

const Content = ({
	images,
	images2,
	title,
	current,
	i,
	copy,
	button,
}: DestinationEntryTypes & { current?: number; i: number }) => {
	return (
		<>
			{!!images?.length && (
				<ImageComponent
					className="aspect-[3/4] w-full object-cover max-h-[445px]"
					image={images[0]}
				/>
			)}
			{/* Icon  */}
			{!!images2?.length && (
				<ImageComponent
					image={images2[0]}
					className="absolute top-2 right-2 h-8 w-8"
				/>
			)}
			<h3 className="mt-6 mb-2">{title}</h3>
			{(!current || current - 1 === i) && (
				<>
					<CopyText className="text-[16px]">{copy}</CopyText>
					{!!button?.length && (
						<Action
							className="text-[16px] font-semibold"
							button={button?.[0]}
						/>
					)}
				</>
			)}
		</>
	);
};

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CustomCarousel,
};
