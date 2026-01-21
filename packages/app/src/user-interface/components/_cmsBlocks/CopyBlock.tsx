import React from "react";

import { cn } from "@/user-interface/client-utils/cn";
import parse from "html-react-parser";

const CopyBlockContainer = ({
	children,
	key,
}: {
	children: React.ReactNode;
	key: string;
}) => {
	return (
		<section
			key={key}
			className="flex justify-center flex-col mx-[10%] mt-16 mb-12 lg:mt-24 lg:mb-24 lg:max-w-3xl lg:mx-auto"
		>
			{children}
		</section>
	);
};

const StrongText = ({ children }: { children: React.ReactNode }) => {
	return <h2 className="text-center mb-2 lg:text-left">{children}</h2>;
};

const SubText = ({ children }: { children: React.ReactNode }) => {
	return <h3 className="mb-2 text-center lg:text-left">{children}</h3>;
};

const CopyText = ({
	children,
	className,
}: {
	children?: string;
	className?: string;
}) => {
	return (
		<div className={cn("parse-text text-balance", className)}>
			{parse(children ?? "")}
		</div>
	);
};

export { CopyBlockContainer, StrongText, SubText, CopyText };
