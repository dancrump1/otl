import { gql } from "graphql-request";

import {
	Button,
	buttonQuery,
	callToActionQuery,
	ContentBlocksTypes,
	copyBlockQuery,
	embedCodeQuery,
	EtherSeoData,
	FaqEntry,
	faqQuery,
	featuresGridQuery,
	imageBlockQuery,
	imageGridQuery,
	ImagesAsset,
	imagesQuery,
	packagesQuery,
	recommendationsQuery,
	seoQuery,
	stickyCTAQuery,
} from "./fields.gql";

export interface BaseEntryTypeTypes {
	id: string;
	hero?: ImagesAsset[];
	contentBlocks: ContentBlocksTypes[];
	seo: EtherSeoData;
	uri: string;
	title: string;
	url: string;
	enabled: boolean;
}

export interface QuickNav {
	title: string;
	quickItem: Button;
}

export interface SpecialsTypes {
	title: string;
	copy?: string;
	button?: Button[];
	images?: ImagesAsset[];
}

// ----- START SINGLES -----
export interface HomePageTypes extends BaseEntryTypeTypes {
	quickNav?: QuickNav[];
	headline?: string;
	subhead?: string;
	special: SpecialsTypes[];
}

export const siteNameInn = "neinn";
export const siteNameTucks = "tuckermans";

export const homePageQuery = gql`
query($site: [String]) {
  entry(uri: "__home__", site: $site) {
    ... on home_Entry {
      	id
		title
		hero {
			${imagesQuery}
		}
		quickNav{
			... on quickNav_Entry{
				title
				quickItem {
					  ariaLabel
					link
					target
					title
					type
					url
				}
			}
		}
		headline
		subhead
		special {
			... on special_Entry{
				title
				copy
				button {
					${buttonQuery}
				}
				images {
					${imagesQuery}
				}
			}
		}
    	contentBlocks {
			${callToActionQuery}
			${copyBlockQuery}
			${embedCodeQuery}
			${imageBlockQuery}
			${imageGridQuery}
			${packagesQuery}
			${recommendationsQuery}
			${stickyCTAQuery}
			${featuresGridQuery}
    	}
		${seoQuery}
		url
    }
  }
}
`;

export interface SitemapPageTypes extends AllContentPages {
	typeHandle: string;
	postDate: string;
	dateUpdated: string;
}
export interface SitemapTypes {
	contentPagesEntries: SitemapPageTypes[];
	homeEntries: SitemapPageTypes[];
}
/**
 * TODO PRODUCTION: Update to include all:
 * STRUCTURES
 * SINGLES
 * CHANNELS
 */
export const SitemapQuery = gql`
	{
		contentPagesEntries {
			... on contentPages_Entry {
				id
				uri
				enabled
				typeHandle
			}
		}
		homeEntries {
			... on home_Entry {
				id
				uri
				enabled
				typeHandle
			}
		}
	}
`;

// ----- END SINGLES -----

// ----- START SECTIONS -----

export interface AllContentPages {
	id: string;
	uri: string;
	enabled: boolean;
}

export const AllContentPagesQuery = gql`
	query ($site: [String]) {
		contentPagesEntries(site: $site) {
			... on contentPages_Entry {
				id
				uri
				url
				enabled
			}
		}
	}
`;

export interface ContentPagesEntry extends BaseEntryTypeTypes {
	headline?: string;
	faq?: FaqEntry[];
}

const contentPageQuery = gql`
query ContentPageQuery($site: [String], $uri: [String]) {
  entry (site: $site, uri: $uri) {
    ... on contentPages_Entry {
		title
		headline
		enabled
		hero {
			${imagesQuery}
		}
		contentBlocks {
			${callToActionQuery}
			${copyBlockQuery}
			${embedCodeQuery}
			${imageBlockQuery}
			${imageGridQuery}
			${packagesQuery}
			${recommendationsQuery}
			${stickyCTAQuery}
			${featuresGridQuery}
		}
		${seoQuery}
		${faqQuery}
		url
	}
  }
}
`;
const NoPageFoundQuery = gql`
query ContentPageQuery($site: [String], $uri: [String]) {
  entry (site: $site, uri: $uri) {
    ... on contentPages_Entry {
		hero {
			${imagesQuery}
		}
		
	}
  }
}
`;

const ErrorQuery = gql`
query ContentPageQuery($site: [String], $uri: [String]) {
  entry (site: $site, uri: $uri) {
    ... on contentPages_Entry {
		hero {
			${imagesQuery}
		}
	}
  }
}
`;

export const pageQueries = {
	pages: AllContentPagesQuery,
	contentPage: contentPageQuery,
	"404": NoPageFoundQuery,
	"500": ErrorQuery,
};

// ----- END SECTIONS -----
