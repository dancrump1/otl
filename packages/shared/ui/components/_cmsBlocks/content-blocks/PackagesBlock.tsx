import React from "react";

import { cn } from "@shared/client-utils/cn";
import { PackagesBlockTypes } from "@shared/gql/fields.gql";
import Break from "@shared/public/pattern.svg";

import { CopyText } from "./CopyBlock";

const PackagesBlock = ({ block }: { block: PackagesBlockTypes }) => {
	return (
		<section
			className={cn(
				"w-full h-full",
				!block.backgroundColor && "bg-background-tertiary"
			)}
		>
			<div className="cont-page py-16 md:py-14">
				<h2 className="mt-16">{block.title}</h2>
				<Break className="my-6" />

				<div className="flex flex-wrap gap-8 my-8">
					{block?.packages?.map(({ title, price, copy, headline }, i) => {
						return (
							<div className="md:basis-[calc(50%-40px)] p-8 border border-primary rounded-2xl box-border">
								<h3>{title}</h3>
								<p className="text-black/50 text-[16px]">{headline}</p>
								<p className="text-[24px] font-semibold">{price}</p>
								<CopyText className="text-[16px]">{copy}</CopyText>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default PackagesBlock;
