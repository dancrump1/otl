import { GraphQLClient } from "graphql-request";

const cmsClient = (preview?: boolean, token?: string | false) => {
	const endpoints = `${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT}api`;

	const headers: any = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN}`,
	};

	if (preview) {
		headers["x-craft-token"] = token;
	}

	const graphQLClient = new GraphQLClient(endpoints, {
		headers,
		method: "POST",
	});

	return graphQLClient;
}

export default cmsClient;