import { GraphQLClient } from "graphql-request";

export default function main(preview, token) {
	const endpoints = `${process.env.NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT}api`;

	const headers = {
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
