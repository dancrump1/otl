interface BaseContentBlock {
	id: string;
	uid: string;
	title: string;
	slug: string;
	uri: string | null;
	enabled: boolean;
	archived: boolean;
	siteHandle: string;
	siteId: number;
	siteSettingsId: string;
	language: string;
	searchScore: string | null;
	trashed: boolean;
	status: string;
	dateCreated: string;
	dateUpdated: string;
	lft: string | null;
	rgt: string | null;
	level: string | null;
	root: string | null;
	structureId: string | null;
	isDraft: boolean;
	isRevision: boolean;
	revisionId: string | null;
	revisionNotes: string | null;
	draftId: string | null;
	isUnpublishedDraft: boolean;
	draftName: string | null;
	draftNotes: string | null;
	canonicalId: number;
	canonicalUid: string;
	sectionId: string | null;
	sectionHandle: string | null;
	fieldId: number;
	fieldHandle: string;
	ownerId: number;
	sortOrder: number;
	postDate: string;
	expiryDate: string | null;
	url: string | null;
	enabledForSite: boolean;
}

export const imagesQuery = `
  url
  uid
  alt
  height
  width
  title
  focalPoint
  mimeType
  embeddedAsset {
    height
    html
    iframeCode
    iframeSrc(params: "")
    image
    images
    title
  }
`;

export interface Button extends BaseContentBlock {
	ariaLabel: string;
	classes: string;
	isElement: boolean;
	isEmpty: boolean;
	link: string;
	linkText: string;
	linkUrl: string;
	linkValue: string;
	newWindow: string;
	target: string;
	text: string;
	title: string;
	type: string;
	url: string;
	urlPrefix: string;
	urlSuffix: string;
}

export const buttonQuery = `
  ariaLabel
  classes
  isElement
  isEmpty
  link
  linkText
  linkUrl
  linkValue
  newWindow
  target
  text
  title
  type
  url
  urlPrefix
  urlSuffix
`;

//hours
export interface Hours {
	open: Date;
	close: Date;
}

export const hoursQuery = `
    open
    close
`;

//socials
export interface Socials {
	linkUrl: string;
	linkText: string;
	images: ImagesAsset[];
}

export const socialQuery = `
... on socialProfile_Url_LinkType {
      linkUrl
      linkText
      target
      images {
        ${imagesQuery}
      }
    }
`;

export interface FaqEntry extends BaseContentBlock {
	copy: string;
}

export const faqQuery = `
  faq {
    ... on faqEntry_Entry {
		enabled
      title
      copy
    }
  }
`;

export interface CopyBlockTypes extends BaseContentBlock {
	headline: string;
	copy: string;
	button: Button[];
	typeHandle: "copyBlock";
}

export const copyBlockQuery = `
  ... on copyBlock_Entry {
    enabled
    typeHandle
    title
    copy
  }
`;

export interface ImageBlockTypes extends BaseContentBlock {
	images?: ImagesAsset[];
	typeHandle: "imageBlock";
	toggle: boolean;
}
export interface ImageGridTypes extends BaseContentBlock {
	gridImages?: ImagesAsset[];
	gridToggle: boolean;
	typeHandle: "imageGrid";
}

export const imageBlockQuery = `
  ... on imageBlock_Entry {
    enabled
    typeHandle
    title
    toggle
    images {
      ${imagesQuery}
    } 
  }
`;

export const imageGridQuery = `
  ... on imageGrid_Entry {
    enabled
    typeHandle
    title
	gridToggle
    gridImages {
      ${imagesQuery}
    } 
  }
`;

export interface FeaturesGridTypes extends BaseContentBlock {
	typeHandle: "featureGrid";
	featureGrid?: {
		title: string;
		copy?: string;
		images?: ImagesAsset[];
	}[];
}

export const featuresGridQuery = `
    ...on featureGrid_Entry{
		enabled
		typeHandle
		title
          featureGrid {
            ... on feature_Entry {
              title
              copy
              images{
                ${imagesQuery}
              }
            }
          }
        }`;

export interface StickyCTATypes extends BaseContentBlock {
	typeHandle: "stickyCTA";
	copy: string;
	button: Button[];
	accommodations: AccommodationsTypes[]
}

export interface AccommodationsTypes extends ImagesAsset {
	copy: string;
}

export const stickyCTAQuery = `
  ... on stickyCTA_Entry {
    enabled
    typeHandle
    title
    copy
    button{
      ${buttonQuery}
    }
    accommodations {
      ${imagesQuery}
	  ... on accommodation_Asset{
        copy
      }
    } 
  }
`;

export interface CallToActionTypes extends BaseContentBlock {
	title: string;
	toggle: boolean;
	copy: string;
	button: Button[];
	backgroundColor: boolean; // dark or light
	images?: ImagesAsset[];
	typeHandle: "callToAction";
}

export const callToActionQuery = `
  ... on callToAction_Entry {
    enabled
    typeHandle
    title
	toggle
    copy
    backgroundColor
    button {
      ${buttonQuery}
    }
    images {
      ${imagesQuery}
    }
  }
`;

export interface EmbedCodeTypes extends BaseContentBlock {
	embedUrl: string;
	typeHandle: "embedCode";
}

export const embedCodeQuery = `
  ... on embedCode_Entry {
    embedUrl
    enabled
    typeHandle
  }
`;

export interface DestinationEntryTypes extends BaseContentBlock {
	title: string;
	copy?: string;
	images?: ImagesAsset[];
	images2?: ImagesAsset[];
	button?: Button[];
}

export interface RecommendationsBlockTypes extends DestinationEntryTypes {
	typeHandle: "recommendationsBlock";
	title: string;
	copy?: string;
	recommendations?: DestinationEntryTypes[];
	toggle: boolean;
}

export const recommendationsQuery = `
... on recommendationsBlock_Entry {
    enabled
    typeHandle
    title
	toggle
    copy
    recommendations {
      ... on destination_Entry {
        title
        copy
        images {
          ${imagesQuery}
        }
        images2 {
          ${imagesQuery}
        }
        button {
          ${buttonQuery}
        }
      }
    }
  }
`;
export interface PackageEntryTypes extends BaseContentBlock {
	title: string;
	headline?: string; //subhead
	price?: string;
	copy?: string;
}
export interface PackagesBlockTypes extends PackageEntryTypes {
	typeHandle: "packagesBlock";
	title: string;
	backgroundColor: boolean;
	packages?: PackageEntryTypes[];
}

export const packagesQuery = `
... on packagesBlock_Entry {
    enabled
    typeHandle
    title
	backgroundColor
    packages {
      ... on packageEntry_Entry {
        title
		headline
		price
        copy
      }
    }
  }
`;

export interface EtherSeoSocialData {
	title: string;
	description: string;
	image: ImagesAsset;
}

export interface EtherSeoData {
	title: string;
	description?: string;
	social?: {
		twitter: EtherSeoSocialData;
		facebook: EtherSeoSocialData;
	};
}

export const seoQuery = `
  seo {
    title
    description
    social {
      twitter {
        title
        description
        image {
          ${imagesQuery}
        }
      }
      facebook {
        title
        description
        image {
          ${imagesQuery}
        }
      }
    }
  }
`;

export interface ImagesAsset extends BaseContentBlock {
	alt: string;
	volumeId: number;
	size: string;
	height: number;
	width: number;
	img: string;
	srcset: string;
	url: string;
	mimeType: string;
	format: string;
	dateModified: string;
	embeddedAsset: EmbeddedAssetInterface;
	focalPoint: number[];
}

export interface DocumentsAsset extends BaseContentBlock {
	alt: string;
	volumeId: number;
	size: string;
	height: number;
	width: number;
	img: string;
	srcset: string;
	url: string;
	mimeType: string;
	format: string;
	embeddedAsset: EmbeddedAssetInterface;
}

export interface EmbeddedAssetInterface {
	title: string;
	description: string;
	url: string;
	type: string;
	image: string;
	imageWidth: number;
	imageHeight: number;
	code: string;
	width: number;
	height: number;
	aspectRatio: number;
	authorName: string;
	authorUrl: string;
	providerIcon: string;
	providerName: string;
	providerUrl: string;
	publishedTime: string;
	license: string;
	isSafe: boolean;
	html: string;
	iframeCode: string;
	iframeSrc: string;
}

export type ContentBlocksTypes =
	| CopyBlockTypes
	| CallToActionTypes
	| ImageBlockTypes
	| ImageGridTypes
	| EmbedCodeTypes
	| PackagesBlockTypes
	| RecommendationsBlockTypes
	| StickyCTATypes
	| FeaturesGridTypes;
