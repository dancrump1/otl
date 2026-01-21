import { gql } from "graphql-request";

import { callToActionQuery, ContentBlocksTypes, copyBlockQuery, embedCodeQuery, EtherSeoData, FaqEntry, faqQuery, imageBlockQuery, ImagesAsset, imagesQuery, seoQuery } from "./fields.gql";

export interface BaseEntryTypeTypes {
  id: string;
  hero?: ImagesAsset[];
  contentBlocks: ContentBlocksTypes[];
  seo: EtherSeoData;
  uri: string;
  title: string;
  url: string;
}

// ----- START SINGLES ----- 
export interface HomePageTypes extends BaseEntryTypeTypes {
  ctaBlocks?: any;
  images?: any;
}

// TODO STARTUP: Replace this
export const homePageQuery = gql`
{
  entry(uri: "__home__") {
    ... on home_Entry {
      id
      url
      hero {
        ${imagesQuery}
      }
      contentBlocks {
        ${embedCodeQuery}
        ${copyBlockQuery}
        ${imageBlockQuery}
        ${callToActionQuery}
      }
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
  // solspace_calendar: { events: { id: string; uri: string } }
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
	{
		contentPagesEntries {
			... on contentPages_Entry {
				id
				uri
				enabled
			}
		}
	}
`;

export interface ContentPagesEntry extends BaseEntryTypeTypes {
  faq?: FaqEntry;
}

// TODO STARTUP: Replace this
const contentPageQuery = gql`
query ContentPageQuery($uri: [String]) {
  entry (uri: $uri) {
    ... on contentPages_Entry {
    title
    url
    hero {
      ${imagesQuery}
    }
    ${seoQuery}
    ${faqQuery}
    contentBlocks {
      ${embedCodeQuery}
      ${copyBlockQuery}
      ${imageBlockQuery}
      ${callToActionQuery}
      }
    }
  }
}
`;

export const pageQueries = {
  pages: AllContentPagesQuery,
  contentPage: contentPageQuery,
};

// ----- END SECTIONS ----- 