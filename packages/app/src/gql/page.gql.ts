import { gql } from 'graphql-request'

import {
  buttonQuery,
  callToActionQuery, copyBlockQuery, embedCodeQuery,
  faqQuery,
  imageBlockQuery, imagesQuery,
  seoQuery
} from './contentBlock.gql';


export const PagesPagesEntryQuery = gql`
{
  entries {
    id
    uri
    enabled
  }
}
`

const contentPageQuery = gql`
query ContentPageQuery($uri: [String]) {
  entry (uri: $uri) {
    title
    ... on contentPages_Entry {
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
`

const homePageQuery = gql`
{
  homeEntries {
    ... on home_Entry {
      id
      hero {
        ${imagesQuery}
      }
      headline
      contentBlocks {
        ... on callToAction_Entry {
          images {
          ${imagesQuery}
          }
          headline
          button {
          ${buttonQuery}
          }
          copy
        }
      }
    }
  }
}
`


export const pageQueries = {
  pages: PagesPagesEntryQuery,
  contentPage: contentPageQuery,
  home: homePageQuery,
}
