import { PagesPagesEntryQuery } from "@/gql/page.gql";
import cmsClient from "@/helpers/cmsClient";

const URL = process.env.NEXT_PUBLIC_SITEMAP_URL;

function generateSiteMap(routes) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${URL}</loc>
     </url>
     ${routes
			.map((route) => {
				return `
                    <url>
                        <loc>${`${process.env.NEXT_PUBLIC_SITEMAP_URL}${route.uri}`}</loc>
                        <changefreq>daily</changefreq>
                            <priority>0.7</priority>
                            <lastmod>${
											route?.dateUpdated || route?.postDate
										}</lastmod>
                    </url>
                `;
			})
			.join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
	const client = cmsClient();
	// const { navigationNodes } = await client.request(sitemapQuery);
	const pages = await client.request(PagesPagesEntryQuery);

	const entries = pages.entries
		.filter((entry) => entry.typeHandle !== "adminEntryType")
		.filter((item) => !!item.uri && !!item.enabled);
	const events = pages.solspace_calendar.events.filter((item) => !!item.uri);

	// Generate the XML sitemap with the blog data
	const sitemap = generateSiteMap([...entries, ...events]);

	res.setHeader("Content-Type", "text/xml");
	// Send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default function SiteMap() {}
