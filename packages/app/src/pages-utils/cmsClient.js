import { GraphQLClient } from "graphql-request";

const craftFetch = async (url, options) => {
	const response = await fetch(url, options);
	const contentType = response.headers.get("Content-Type");

	if (contentType?.includes("graphql-response+json")) {
		const body = await response.text();

		return new Response(body, {
			status: response.status,
			statusText: response.statusText,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	return response;
};

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
		fetch: craftFetch,
	});

	return graphQLClient;
}
