"use client";

import React, { useEffect, useMemo, useState, type CSSProperties } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/user-interface/client-utils/cn";

// Credit: https://www.cult-ui.com/docs/components/text-gif

const textBaseVariants = cva("inline-block max-w-full", {
	variants: {
		size: {
			default: "text-2xl sm:text-3xl lg:text-4xl",
			xxs: "text-sm",
			xs: "text-base sm:text-lg",
			sm: "text-xl sm:text-2xl lg:text-3xl",
			md: "text-2xl sm:text-3xl lg:text-4xl",
			lg: "text-3xl sm:text-4xl lg:text-5xl",
			xl: "text-4xl sm:text-5xl lg:text-6xl",
			xxl: "text-[2.5rem] sm:text-6xl lg:text-[6rem]",
			xxxl: "text-5xl sm:text-6xl lg:text-8xl",
		},
		weight: {
			default: "font-bold",
			semi: "font-semibold",
			bold: "font-bold",
			black: "font-black",
		},
	},
	defaultVariants: {
		size: "default",
		weight: "bold",
	},
});

interface GifTextProps extends VariantProps<typeof textBaseVariants> {
	gifUrl: string;
	text: string;
	className?: string;
	fallbackColor?: string;
	as?: "h1" | "h2" | "p" | "span";
}

export const GifText = React.memo(function GifTextComponent({
	gifUrl,
	text,
	size,
	weight,
	className,
	fallbackColor = "white",
	as: Tag = "span",
}: GifTextProps) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoaded(false);
		setError(false);
		const image = new window.Image();
		image.src = gifUrl;
		image.onload = () => {
			setLoaded(true);
			setError(false);
		};
		image.onerror = () => {
			setError(true);
			setLoaded(false);
		};
	}, [gifUrl]);

	const textClassName = useMemo(
		() =>
			cn(
				textBaseVariants({ size, weight }),
				loaded && !error ? "text-transparent bg-clip-text" : "",
				className,
			),
		[size, weight, className, loaded, error],
	);

	const textStyle = useMemo(() => {
		const style: CSSProperties = {
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			lineHeight: 0.95,
			color: fallbackColor,
			WebkitTextFillColor: fallbackColor,
		};

		if (loaded && !error) {
			style.backgroundImage = `url(${gifUrl})`;
			style.color = "transparent";
			style.WebkitTextFillColor = "transparent";
		}

		return style;
	}, [loaded, error, gifUrl, fallbackColor]);

	return (
		<Tag className={textClassName} style={textStyle}>
			{text}
		</Tag>
	);
});
