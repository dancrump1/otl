import React from "react";

import { Button } from "@/gql/fields.gql";

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
		<a
			href={button?.linkUrl || ""}
			target={button?.target}
			referrerPolicy={button.target && "no-referrer"}
			className={className}
			key={key || button?.linkUrl || "default_key"}
		>
			{button?.linkText || "Learn More"}
		</a>
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
