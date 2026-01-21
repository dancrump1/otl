"use client";

import { cn } from "@shared/client-utils/cn";

import { CopyText } from "./_cmsBlocks/content-blocks/CopyBlock";

const Grid = ({
	data,
}: {
	data: {
		title: string;
		options: {
			title: string;
			copy?: string;
			headline?: string;
			price?: string;
		}[];
	}[];
}) => {
	return (
		<section className={cn("place-items-center flex")}>
			<div className="w-full">
				{data.map(({ title, options }, i) => {
					return (
						<section
							className={cn(
								"",
								i % 2 === 0 ? "" : "bg-background-tertiary"
							)}
						>
							<div className="cont-page">
								<h2 className="pt-16">{title}</h2>
								<div className="flex flex-col md:flex-row gap-4 pb-16 pt-3">
									{options.map(({ title, copy, headline, price }) => {
										return (
											<div
												className={cn(
													"border border-black rounded-2xl px-4 flex-[1_1_calc(50%-1rem)]"
												)}
											>
												<span
													className={cn(
														"block text-2xl pt-6",
														"pointer-events-none cursor-default"
													)}
												>
													{title}
												</span>
												<span className="text-xs pb-6 block">
													{headline}
												</span>
												<CopyText className="[&>*]:text-sm">
													{price}
												</CopyText>
												<span className="block py-3 overflow-hidden text-sm">
													<CopyText className="[&>*]:text-base">
														{copy}
													</CopyText>
												</span>
											</div>
										);
									})}
								</div>
							</div>
						</section>
					);
				})}
			</div>
		</section>
	);
};

export default Grid;
