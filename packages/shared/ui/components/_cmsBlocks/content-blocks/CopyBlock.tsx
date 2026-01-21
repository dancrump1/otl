import React from "react";

import { cn } from "@shared/client-utils/cn";
import parse from "html-react-parser";

const CopyBlockContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex justify-center flex-col cont-page lg:mx-auto">
			{children}
		</div>
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
		<div className={cn("parse-text", className)}>
			{parse(children ?? "")}
		</div>
	);
};

export { CopyBlockContainer, StrongText, SubText, CopyText };
