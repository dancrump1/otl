import Link from "next/link";

import Layout from "@shared/ui/layouts/Layout";

// TODO STARTUP: Replace this

function Custom404() {
	return (
		<h1>
			404 - Page Not Found
			<br />
			<Link href={"/"}>Return</Link>
		</h1>
	);
}

Custom404.getLayout = function getLayout(page: any) {
	return <Layout pageProps={page.props}>{page}</Layout>;
};

// TODO STARTUP: Enable this for 404 page with navigation
// export const getStaticProps: GetStaticProps = async ({
// 	params,
// 	preview,
// 	previewData,
// }) => {
// 	// if we are in preview mode, get the token from the previewData
// 	const client = cmsClient(preview, token);
// 	let data;

// 	try {
// 		data = await client.request(query, { uri: page });
// 	}

// 	return {
// 		props: {
// 			data,
// 		},
// 		// Next.js will invalidate the cache when a
// 		// request comes in, at most once every 3600 seconds.
// 		revalidate: 3600,
// 	};
// };

export default Custom404;
