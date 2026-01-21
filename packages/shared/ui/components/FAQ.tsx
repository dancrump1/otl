"use client";

import { cn } from "@shared/client-utils/cn";
import { FaqEntry } from "@shared/gql/fields.gql";

import { CopyText } from "./_cmsBlocks/content-blocks/CopyBlock";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./accordion";

const FAQ = ({ data }: { data: FaqEntry[] }) => {
	const accordionProps = {
		type: "single" as const,
		collapsible: true,
		defaultValue: data[0].title,
		className: "w-full",
	};
	return (
		<section className={cn("bg-background-tertiary")}>
			<div className="cont-page place-items-center py-16 md:py-28">
				<h2 className="text-center mx-12">FREQUENTLY ASKED QUESTIONS</h2>
				<Accordion {...accordionProps}>
					{data.map(({ title, copy }, i) => {
						return (
							<>
								<AccordionItem
									value={title}
									className={cn(
										"border border-primary rounded-2xl my-6 md:my-16 p-4 md:p-8"
									)}
								>
									<AccordionTrigger>
										{title}
									</AccordionTrigger>
									<AccordionContent className="pt-4">
										<CopyText className="text-[16px]">
											{copy}
										</CopyText>
									</AccordionContent>
								</AccordionItem>
							</>
						);
					})}
				</Accordion>
			</div>
		</section>
	);
};

export default FAQ;
