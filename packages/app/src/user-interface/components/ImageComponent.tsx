import Image from "next/image";

import { ImagesAsset } from "@/gql/fields.gql";
import SVG from "react-inlinesvg";

import { cn } from "../client-utils/cn";

const ImageComponent = ({
	image,
	className,
	width,
	height,
	...rest
}: {
	image: ImagesAsset;
	className?: string;
	width?: number;
	height?: number;
	[x: string]: any;
}) => {
	if (!image) return null;

	// When importing an SVG from CMS, Image from next/image converts to img tag
	// fix with react-inlineSVG
	if (!!image.mimeType?.includes("svg")) {
		return (
			<SVG
				src={image.url || ""}
				title={image.title}
				// height={30}
				// width={30}
				className={className}
				role="img"
				// aria-label={"test"}
			/>
		);
	}

	// Custom Image to handle CMS data including focal point
	return (
		<Image
			{...rest}
			placeholder={image.blurValue ? "blur" : "empty"}
			blurDataURL={image.blurValue}
			key={image.uid}
			className={cn("h-full w-full object-cover", className)}
			src={image.url}
			title={image.alt}
			alt={image.alt || image.title || ""}
			width={width || image.width || 1920}
			height={height || image.height || 1080}
			style={
				image.focalPoint
					? {
							objectPosition: `${image.focalPoint[0] * 100}% ${
								image.focalPoint[1] * 100
							}%`,
					  }
					: {}
			}
		/>
	);
};

export default ImageComponent;
