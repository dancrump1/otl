import React from "react";

import { cn } from "@shared/client-utils/cn";
import { ImageGridTypes } from "@shared/gql/fields.gql";

import ImageComponent from "./Image";
import MobileGrid from "./MobileGrid";

const getContainerClasses = (length: number, i: number) => {
	const common = ["hidden", "md:block"];

	const gridStyles = {
		3: [
			i === 0 &&
				"row-span-2 content-center justify-self-center flex-[1_1_100%] place-items-center !flex justify-center",
			i === 1 &&
				"justify-items-end flex-[1_1_calc(50%-1rem)] !flex justify-end",
			i === 2 && "flex-[1_1_calc(50%-1rem)]",
		],
		4: [
			i === 0 &&
				"flex-[1_1_calc(47%-1rem)] justify-items-end self-end !flex justify-end",
			i === 1 && "flex-[1_1_calc(53%-1rem)]",
			i === 2 &&
				"flex-[1_1_calc(53%-1rem)] justify-items-end pl-16 !flex justify-end",
			i === 3 && "pb-6 flex-[1_1_calc(47%-1rem)] pr-16",
		],
		5: [
			i === 0 &&
				"pt-4 place-items-end content-end flex-[1_1_calc(45%-1rem)]  !flex justify-end",
			i === 1 && "flex-[1_1_calc(45%-1rem)]",
			i === 2 &&
				"row-span-2 pb-[200px] flex-[1_1_calc(30%-1rem)] place-items-end  !flex justify-end",
			i === 3 && "flex-[1_1_calc(30%-1rem)]",
			i === 4 && "flex-[1_1_calc(30%-1rem)]",
		],
		6: [
			(i === 1 || i === 2) && "row-span-2",
			[
				i === 0 &&
					"flex-[1_1_calc(31%-1rem)] place-self-end place-items-end",
				i === 1 &&
					"flex-[1_1_calc(38%-1rem)] min-h-[400px] place-items-end pt-4",
				i === 2 &&
					"flex-[1_1_calc(25%-1rem)] place-content-end pt-4 place-items-end",
				i === 3 && "flex-[1_1_calc(27%-1rem)] pl-4",
				i === 4 && "flex-[1_1_calc(28%-1rem)]",
				i === 5 && "flex-[1_1_calc(34%-1rem)] pr-4",
				i === 2 && "",
			],
		],
	};

	return cn(common, gridStyles[length]);
};

const getImageClasses = (length: number, i: number) => {
	const common = ["object-cover w-full h-full"];

	const styles = {
		3: [
			i === 0 && "max-w-[400px] h-[320px]",
			i === 1 && "max-w-[350px] h-[350px]",
			i === 2 && "pr-4 max-w-[360px] h-[440px]",
		],
		4: [
			i === 0 && "max-w-[400px] h-[320px] self-end",
			i === 1 && "max-w-[490px] h-[400px]",
			i === 2 && "max-w-[350px] h-[350px]",
			i === 3 && "max-w-[360px] h-[440px]",
		],
		5: [
			i === 0 && "max-w-[400px] h-[320px]",
			i === 1 && "max-w-[490px] h-[400px]",
			i === 2 && "max-w-[350px] h-[350px]",
			i === 3 && "w-full h-[440px]",
			i === 4 && "max-w-[440px] h-[360px]",
		],
		6: [
			i === 0 && "max-w-[400px] h-[320px]",
			i === 1 && "w-[490px] max-h-[400px]",
			i === 2 && "max-w-[320px] h-[320px]",
			i === 3 && "max-w-[350px] h-[350px] place-self-end",
			i === 4 && "w-full h-[440px]",
			i === 5 && "max-w-[440px] h-[360px]",
		],
	};

	return cn(common, styles[length]);
};

const HorizontalGrid = ({
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
			<div className={cn("mx-auto flex-wrap w-fit gap-4 hidden", "md:flex")}>
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

export default HorizontalGrid;
