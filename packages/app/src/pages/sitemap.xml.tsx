import {
	SitemapPageTypes,
	SitemapQuery,
	SitemapTypes,
} from "@shared/gql/entrytype.gql";
import cmsClient from "@shared/pages-utils/cmsClient";

function generateSiteMap(routes: SitemapPageTypes[]) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     ${routes
			.map((route) => {
				return `
                    <url>
                        <loc>${`${process.env.NEXT_PUBLIC_SITEMAP_URL}${route.uri}`}</loc>
                        <changefreq>daily</changefreq>
                            <priority>0.7</priority>
							${
								route?.dateUpdated || route?.postDate
									? `<lastmod>${
											route?.dateUpdated || route?.postDate
									  }</lastmod>`
									: ""
							}
                    </url>
                `;
			})
			.join("")}
   </urlset>
 `;
}

// function removeDuplicates(arr: any[], key: string) {
// 	let seenValues = new Set();
// 	return arr.filter((obj) => {
// 		const value = obj[key];
// 		if (seenValues.has(value)) {
// 			return false; // Skip object if value already exists
// 		} else {
// 			seenValues.add(value);
// 			return true; // Keep object and add value to seen values
// 		}
// 	});
// }

export async function getServerSideProps({ res }: { res: any }) {
	const client = cmsClient();
	// const { navigationNodes } = await client.request(sitemapQuery);

	/**
	 * TODO PRODUCTION: Update to include all:
	 * STRUCTURES
	 * SINGLES
	 * CHANNELS
	 */
	const { contentPagesEntries, homeEntries } =
		await client.request<SitemapTypes>(SitemapQuery);

	const entries = contentPagesEntries
		.filter((entry) => entry.typeHandle !== "adminEntryType")
		.filter((item) => !!item.uri && !!item.enabled)
		.filter((item) => !item.uri.includes("__home__"));

	// TODO STARTUP: Do we need reoccuring events for this site?
	// const events = removeDuplicates(
	// 	pages.solspace_calendar.events.filter((item) => !!item.uri),
	// 	"uri"
	// );

	// Generate the XML sitemap with the blog data
	const sitemap = generateSiteMap([
		...entries,
		{ ...homeEntries[0], uri: "" },
		// , ...events
	]);

	res.setHeader("Content-Type", "text/xml");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=3600, stale-while-revalidate=10"
	);
	// Send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default function SiteMap() {}
