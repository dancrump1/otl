import React from "react";

import { RecommendationsBlockTypes } from "@shared/gql/fields.gql";

import { CustomSlider } from "../../CustomSlider";

const RecommendationsBlock = ({
	block,
}: {
	block: RecommendationsBlockTypes;
}) => {
	return <CustomSlider data={block} />;
};

export default RecommendationsBlock;
