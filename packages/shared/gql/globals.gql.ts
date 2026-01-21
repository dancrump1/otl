import { gql } from "graphql-request";

import { siteNameInn, siteNameTucks } from "./entrytype.gql";
import {
	Button,
	buttonQuery,
	Hours,
	hoursQuery,
	ImagesAsset,
	imagesQuery,
	socialQuery,
	Socials,
} from "./fields.gql";

export interface NEILogoGlobalSet {
	id: string;
	title: string;
	logo: ImagesAsset[];
}
export const NEILogoQuery = gql`
{
  globalSet(handle: "neilogo"){
    ... on neiLogo_GlobalSet{
      logo{
        ${imagesQuery}
      }
    }
  }
}
`;

export interface TucksLogoGlobalSet {
	id: string;
	title: string;
	logo: ImagesAsset[];
}
export const TucksLogoQuery = gql`
{
  globalSet(handle: "tuckslogo"){
    ... on tucksLogo_GlobalSet{
      logo{
        ${imagesQuery}
      }
    }
  }
}
`;

export interface BuyButtonGlobalSet {
	id: string;
	title: string;
	button: Button[];
}
export const BuyButtonQuery = gql`
query($site: [String]) {
  globalSet(handle: "buyButton", site: $site){
    ... on buyButton_GlobalSet{
      button{
        ${buttonQuery}
      }
    }
  }
}
`;

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
	images?: ImagesAsset[]; //Background
	button?: Button[]; //newsletter
	dailyHours: Hours[]; // hours
	socialProfile?: Socials[]; // socials
	footerCopy?: string;
}
export const footerQuery = gql`
 query($site: [String]) {
	globalSet(handle: "footer", site: $site){
    	... on footer_GlobalSet {
			id
			name
			footerCopy
			images {
			${imagesQuery}
			}
			button {
				${buttonQuery}
			}
			dailyHours {
				${hoursQuery}
			}
			socialProfile {
				${socialQuery}
			}
		}
	}	
}
`;

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
	address?: Address[];
	phone?: PhoneNumber;
	email?: string;
}

export const contactQuery = gql`
	query ($site: [String]) {
		globalSet(handle: "contact", site: $site) {
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
`;

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

export interface NavigationInterface {
	navigationNodes?: {
		id: string;
		title: string;
		nodeUri: string;
		level?: number;
		navName: string;
		newWindow: boolean;
		children: {
			id: string;
			title: string;
			nodeUri: string;
			newWindow: boolean;
			url: string;
		}[];
	}[];
}

const navItemQuery = `
	newWindow
	id
	title
	nodeUri
	navName
	level
	url
`;

export const NavQuery = gql`
	{
		navigationNodes(site: "${siteNameInn}", level:1, navHandle: "neiHeader") {
			... on neiHeader_Node {
				${navItemQuery}
				children {
					${navItemQuery}
				}
			}
		}
	}
`;
export const NEIFooterQuery = gql`
	{
		navigationNodes(site: "${siteNameInn}") {
			... on neiFooter_Node {
				${navItemQuery}
			}
		}
	}
`;
export const TuckNavQuery = gql`
{
	navigationNodes(site: "${siteNameTucks}", level:1, navHandle: "tucksHeader") {
  		... on tucksHeader_Node {
			${navItemQuery}
			children {
				${navItemQuery}
			}
    	}
  	}
}
`;
export const TuckFooterQuery = gql`
	{
		navigationNodes(site: "${siteNameTucks}") {
			... on tucksFooter_Node {
				${navItemQuery}
			}
		}
	}
`;
export const siteUrlQuery = gql`
	query ($site: [String]) {
		entry(uri: "__home__", site: $site) {
			url
		}
	}
`;
