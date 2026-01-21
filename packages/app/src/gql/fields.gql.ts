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

export interface Button {
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

export interface FaqEntry extends BaseContentBlock {
	copy: string;
}

export const faqQuery = `
  faq {
    ... on faqEntry_Entry {
      copy
      title
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
    headline
    title
    copy
  }
`;

export interface ImageBlockTypes extends BaseContentBlock {
	image: ImagesAsset[];
	typeHandle: "imageBlock";
}

export const imageBlockQuery = `
  ... on imageBlock_Entry {
    enabled
    images {
      ${imagesQuery}
    }
    typeHandle
    title
  }
`;

export interface CallToActionTypes extends BaseContentBlock {
	headline: string;
	copy: string;
	button: Button[];
	// TODO: Replace any
	images?: ImagesAsset[];
	typeHandle: "callToAction";
}

export const callToActionQuery = `
  ... on callToAction_Entry {
    enabled
    typeHandle
    images {
      ${imagesQuery}
    }
    title
    headline
    copy
    
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

export interface EtherSeoSocialData {
	title: string;
	description: string;
	image: ImagesAsset;
}

export interface EtherSeoData {
	social?: {
		twitter: EtherSeoSocialData;
		facebook: EtherSeoSocialData;
	};
	title?: string;
	description?: string;
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

export interface ArticlesBlockTypes extends BaseContentBlock {
	typeHandle: "articlesBlock";
}

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
	| ArticlesBlockTypes
	| EmbedCodeTypes;
