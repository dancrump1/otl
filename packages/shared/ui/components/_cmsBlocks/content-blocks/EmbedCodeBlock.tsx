import React from "react";

import { EmbedCodeTypes } from "@shared/gql/fields.gql";

const EmbedCodeBlock = ({ block }: { block: EmbedCodeTypes }) => {
	return (
		<section className="embedWrapper">
			<iframe
				src={block.embedUrl}
				width="800px"
				height="450px"
				allowFullScreen
			></iframe>
		</section>
	);
};

export default EmbedCodeBlock;
