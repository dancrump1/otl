import React from "react";

import Link from "next/link";

import { Button } from "@/gql/types/page";

const Action = ({
	button,
	className,
	key,
}: {
	button: Button;
	className?: string;
	key?: string;
}) => {
	return button?.type.includes("Entry") ? (
		<Link
			href={button?.linkUrl || ""}
			target={button?.target}
			referrerPolicy={button.target && "no-referrer"}
			className={className}
			key={key || button?.linkUrl || "default_key"}
		>
			{button?.linkText || "Learn More"}
		</Link>
	) : (
		<a
			href={button?.url}
			target={button?.target}
			referrerPolicy={button?.target && "no-referrer"}
			className={className}
		>
			{button?.linkText || "Learn More"}
		</a>
	);
};

export default Action;
