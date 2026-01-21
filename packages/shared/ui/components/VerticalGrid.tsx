import React from "react";

import { cn } from "@shared/client-utils/cn";
import { ImageGridTypes } from "@shared/gql/fields.gql";

import ImageComponent from "./Image";
import MobileGrid from "./MobileGrid";

const getContainerClasses = (length: number, i: number) => {
	const common = ["hidden", "md:block"];

	const gridStyles = {
		3: [i === 0 && "pt-36 pl-24", i === 1 && "pb-4", i === 2 && "pr-16"],
		4: [
			i === 0 && "place-items-end pb-4 !flex justify-end",
			i === 1 && "place-self-end !flex justify-end",
			i === 2 && "pb-4 pt-20",
			i === 3 && "pr-16",
		],
		5: [
			i === 0 && "place-items-end pt-32 !flex justify-end",
			i === 1 && "md:flex place-content-end",
			i === 2 && "pb-0",
			i === 4 && "pr-0",
		],
		6: [
			(i === 1 || i === 2) && "row-span-2",
			[
				i === 0 && "place-self-end pb-4 !flex justify-end",
				i === 1 && "place-content-end pb-4 pl-10",
				i === 2 && "place-self-end !flex justify-end",
				i === 3 && "pt-6 mb-4",
				i === 4 && "mb-4",
				i === 5 && "pr-20",
			],
		],
	};

	return cn(common, gridStyles[length]);
};

const getImageClasses = (length: number, i: number) => {
	const common = ["object-cover w-full h-full"];

	const styles = {
		3: [
			i === 0 && "max-w-[320px] h-[400px]",
			i === 1 && "max-w-[440px] h-[360px]",
			i === 2 && "max-w-[350px] h-[350px]",
		],
		4: [
			i === 0 && "max-w-[400px] h-[490px]",
			i === 1 && "max-w-[320px] h-[400px]",
			i === 2 && "max-w-[440px] h-[360px]",
			i === 3 && "max-w-[350px] h-[350px]",
		],
		5: [
			i === 0 && "h-[490px] max-w-[400px]",
			i === 1 && "h-[400px] max-w-[320px] pt-4 justify-self-end",
			i === 2 && "h-[440px] max-w-[360px] pb-4",
			i === 3 && "max-w-[440px] h-[360px] pb-4",
			i === 4 && "max-w-[350px] h-[350px]",
		],
		6: [
			i === 0 && "h-[320px] max-w-[320px]",
			i === 1 && "h-[490px] max-w-[400px]",
			i === 2 && "h-[400px] max-w-[320px] place-items-end",
			i === 3 && "h-[440px] max-w-[360px]",
			i === 4 && "h-[360px] max-w-[440px]",
			i === 5 && "max-w-[350px] h-[350px]",
		],
	};

	return cn(common, styles[length]);
};

const VerticalGrid = ({
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
		<>
			{/* MOBILE */}
			<MobileGrid block={block} />
			{/* END MOBILE */}

			{/* TABLET / DESKTOP */}
			<div
				className={cn(
					"mx-auto flex-wrap w-fit gap-4 hidden",
					block.gridImages.length >= 5 && "block columns-2",
					// If vertical, force columns and block
					"columns-2 md:block"
				)}
			>
				{block.gridImages?.map((img, i) => {
					const length = block.gridImages?.length;

					return (
						<>
							<div
								key={`container-${i}`}
								className={cn(
									getContainerClasses(length, i),
									className
								)}
							>
								<ImageComponent
									key={`${i}-bento`}
									image={img}
									className={getImageClasses(length, i)}
								/>
							</div>
						</>
					);
				})}
			</div>
			{/* END TABLET / DESKTOP */}
		</>
	);
};

export default VerticalGrid;
