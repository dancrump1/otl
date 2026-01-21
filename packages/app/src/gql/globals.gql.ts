import { gql } from "graphql-request";
import { imagesQuery } from "./fields.gql";

export interface HeaderGlobalSet {
  id: string;
  uid: string;
  _count: number;
  title: string;
  slug: string;
  uri: string;
  enabled: boolean;
  archived: boolean;
  siteHandle: string;
  siteId: number;
  siteSettingsId: string;
  language: string;
  searchScore: number;
  trashed: boolean;
  status: string;
  dateCreated: string;
  dateUpdated: string;
}
// TODO STARTUP: Replace this
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

export interface FooterGlobalSet {
  id: string;
  uid: string;
  _count: number;
  title: string;
  slug: string;
  uri: string;
  enabled: boolean;
  archived: boolean;
  siteHandle: string;
  siteId: number;
  siteSettingsId: string;
  language: string;
  searchScore: number;
  trashed: boolean;
  status: string;
  dateCreated: string;
  dateUpdated: string;
}
// TODO STARTUP: Replace this
export const footerQuery = gql`
 {
  globalSets {
    ... on footer_GlobalSet {
      id
      name
      logo {
       ${imagesQuery}
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

export interface ContactGlobalSet {
  id: string;
  uid: string;
  _count: number;
  title: string;
  slug: string;
  uri: string;
  enabled: boolean;
  archived: boolean;
  siteHandle: string;
  siteId: number;
  siteSettingsId: string;
  language: string;
  searchScore: number;
  trashed: boolean;
  status: string;
  dateCreated: string;
  dateUpdated: string;
  phone: PhoneNumber;
  email: string;
}

export interface PhoneNumber {
  carrierName: string;
  countryCode: string;
  description: string;
  extension: string;
  format: string;
  formatForCountry: string;
  formatForMobileDialing: string;
  number: string;
  region: string;
  regionCode: string;
  type: number;
}

export interface SocialMediaGlobalSet {
  id: string;
  uid: string;
  _count: number;
  title: string;
  slug: string;
  uri: string;
  enabled: boolean;
  archived: boolean;
  siteHandle: string;
  siteId: number;
  siteSettingsId: string;
  language: string;
  searchScore: number;
  trashed: boolean;
  status: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface Address {
  id: string;
  uid: string;
  _count: number;
  title: string;
  slug: string;
  uri: string;
  enabled: boolean;
  archived: boolean;
  siteHandle: string;
  siteId: number;
  siteSettingsId: string;
  language: string;
  searchScore: number;
  trashed: boolean;
  status: string;
  dateCreated: string;
  dateUpdated: string;
  fullName: string;
  firstName: string;
  lastName: string;
  administrativeArea: string;
  locality: string;
  dependentLocality: string;
  postalCode: string;
  sortingCode: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  organization: string;
  organizationTaxId: string;
  latitude: string;
  longitude: string;
}


export interface NavInterface {
  navigationNodes: {

    id: string;
    title: string;
    nodeUri: string;
    navName: string;
    children: {
      newWindow: boolean;
      id: string;
      title: string;
      nodeUri: string;
      url: string;
    }[]
  }[]
}

// TODO STARTUP: Replace header_node / footer_node with name of olivemenu items
export const NavQuery = gql`
{
  navigationNodes(level: 1) {
    ... on header_Node {
      id
      title
      nodeUri
      navName
      children {
        nodeUri
        title
        id
        newWindow
        url
      }
    }
    ... on footer_Node {
      id
      title
      level
      nodeUri
      navName
      newWindow
      url
    }
  }
}
`