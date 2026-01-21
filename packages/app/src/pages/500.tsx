import Layout from "@/client/layouts/Layout";

export default function Custom500() {
	return (
		<div className="bg-gray-100 px-2 text-center">
			<div className="h-screen flex flex-col justify-center items-center">
				<h1 className="text-8xl font-extrabold text-red-500">
					Server Error
				</h1>

				<p className="text-xl text-gray-800 mt-4">
					We apologize for the inconvenience. Please try again later, or
					contact Drive Brand Studio support.
				</p>
				<a href="mailto:support@drivebrandstudio.com">
					support@drivebrandstudio.com
				</a>
				<a href="tel:16033563030">(1)603-356-3030</a>
			</div>
		</div>
	);
}

Custom500.getLayout = function getLayout(page) {
	return <Layout pageProps={page.props}>{page}</Layout>;
};

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
