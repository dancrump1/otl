import { gql } from "graphql-request";
import { imagesQuery } from "./contentBlock.gql";

export const headerQuery = gql`
{
     globalSet(handle: "header") {
    ... on header_GlobalSet {
      logo {
        ${imagesQuery}
      }
    }
  }
}
`


export const footerQuery = gql`
 {
  globalSets {
    ... on footer_GlobalSet {
      id
      name
      logo {
       ${imagesQuery}
      }
      newsletter {
        linkText
        linkUrl
        target
      }
    }
 
    ... on contact_GlobalSet {
      id
      name
      address {
        title
        addressLine1
        locality
        administrativeArea
        postalCode
      }
      phone {
        number
        formatForCountry
      }
      email
    }
  }
}
`