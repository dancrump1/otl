import React from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../atoms/accordion";
import { CopyText } from "./CopyBlock";

const FAQ = ({
	faq = [
		{
			title: "Are there even real questions here?",
			copy: `<span>No. But something really long may appear here and I wanted to make sure I gave a somewhat realistic example of something being put in here. So maybe I should stop typeing at some point but I'm guessing our clients wont respect that so why should I? Did i ask a question in an FAQ answer? yikes... twice....</span>`,
		},
		{
			title: "Example question?",
			copy: "<span>IDK figure it out</span>",
		},
		{
			title: "Who is behind this project?",
			copy: "<span>Dan</span>",
		},
	],
}) => {
	if (!faq?.length) return;

	return (
		<div className="cont-page">
			<Accordion type="single" collapsible>
				{faq?.map((q) => {
					return (
						<AccordionItem value={q.title}>
							<AccordionTrigger className="text-left text-base lg:text-2xl swiss-heavy pr-2">
								{q.title}
							</AccordionTrigger>
							<AccordionContent className="accordion-content">
								<CopyText className="pr-4">{q.copy}</CopyText>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
};

export default FAQ;
