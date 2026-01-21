import React from "react";

import Link from "next/link";

import { Button } from "@shared/gql/fields.gql";

const Action = ({
	button,
	className,
	key,
	children,
	...rest
}: {
	button: Button;
	className?: string;
	key?: string;
	[x: string]: any;
}) => {
	return button?.type?.includes("Entry") ? (
		<Link
			href={button?.linkUrl || ""}
			target={button?.target}
			referrerPolicy={button.target && "no-referrer"}
			className={className}
			key={key || button?.linkUrl || "default_key"}
			{...rest}
		>
			{button?.linkText || children || "Learn More"}
		</Link>
	) : (
		<a
			href={button?.url}
			target={button?.target || !!button?.newWindow ? "_blank" : "_self"}
			referrerPolicy={button?.target && "no-referrer"}
			className={className}
			{...rest}
		>
			{button?.linkText || children || "Learn More"}
		</a>
	);
};

export default Action;
