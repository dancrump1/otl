"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { motion, useInView, type UseInViewOptions, type Variants } from "framer-motion";

import { cn } from "@/user-interface/client-utils/cn";

// Credit: https://www.fancycomponents.dev/docs/components/blocks/media-between-text

type MediaBetweenTextProps = {
	firstText: string;
	secondText: string;
	mediaUrl: string;
	mediaType: "image" | "video";
	mediaContainerClassName?: string;
	fallbackUrl?: string;
	autoPlay?: boolean;
	loop?: boolean;
	muted?: boolean;
	playsInline?: boolean;
	alt?: string;
	triggerType?: "hover" | "ref" | "inView";
	useInViewOptionsProp?: UseInViewOptions;
	animationVariants?: {
		initial: Variants["initial"];
		animate: Variants["animate"];
	};
	className?: string;
	leftTextClassName?: string;
	rightTextClassName?: string;
	mediaClassName?: string;
};

export type MediaBetweenTextRef = {
	animate: () => void;
	reset: () => void;
};

const MediaBetweenText = forwardRef<MediaBetweenTextRef, MediaBetweenTextProps>(
	(
		{
			firstText,
			secondText,
			mediaUrl,
			mediaType,
			mediaContainerClassName,
			fallbackUrl,
			autoPlay = true,
			loop = true,
			muted = true,
			playsInline = true,
			alt,
			triggerType = "hover",
			useInViewOptionsProp = {
				once: true,
				amount: 0.5,
			},
			animationVariants = {
				initial: { width: 0, opacity: 1 },
				animate: {
					width: "auto",
					opacity: 1,
					transition: { duration: 0.4, type: "spring", bounce: 0 },
				},
			},
			className,
			leftTextClassName,
			rightTextClassName,
			mediaClassName,
		},
		ref,
	) => {
		const componentRef = useRef<HTMLDivElement>(null);
		const [isAnimating, setIsAnimating] = useState(false);
		const isInView = useInView(componentRef, useInViewOptionsProp);
		const [isHovered, setIsHovered] = useState(false);

		useImperativeHandle(ref, () => ({
			animate: () => setIsAnimating(true),
			reset: () => setIsAnimating(false),
		}));

		const shouldAnimate =
			triggerType === "hover"
				? isHovered
				: triggerType === "inView"
					? isInView
					: isAnimating;

		return (
			<div
				className={cn("flex", className)}
				ref={componentRef}
				onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
				onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
			>
				<motion.p layout className={leftTextClassName}>
					{firstText}
				</motion.p>
				<motion.div
					className={mediaContainerClassName}
					variants={animationVariants}
					initial="initial"
					animate={shouldAnimate ? "animate" : "initial"}
				>
					{mediaType === "video" ? (
						<video
							className={cn("h-full w-full object-cover", mediaClassName)}
							autoPlay={autoPlay}
							loop={loop}
							muted={muted}
							playsInline={playsInline}
							poster={fallbackUrl}
							src={mediaUrl}
						/>
					) : (
						<img
							src={mediaUrl}
							alt={alt || `${firstText} ${secondText}`}
							className={cn("h-full w-full object-cover", mediaClassName)}
						/>
					)}
				</motion.div>
				<motion.p layout className={rightTextClassName}>
					{secondText}
				</motion.p>
			</div>
		);
	},
);

MediaBetweenText.displayName = "MediaBetweenText";

export default MediaBetweenText;
