export const imagesQuery = `
url
uid
alt
height
width
title
focalPoint
embeddedAsset {
  height
  html
  iframeCode
  iframeSrc(params: "")
  image
  images
  title
}
`

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

export const faqQuery = `
faq {
    ... on faqEntry_Entry {
      copy
      title
    }
  }
`

const copyBlockQuery = `
        ... on copyBlock_Entry {
        enabled
          typeHandle
          headline
          title
          copy
          button {
            ${buttonQuery}
          }
        }
`;

const imageBlockQuery = ` 
... on imageBlock_Entry {
  enabled
  images {
      ${imagesQuery}
      ... on images_Asset {
          enableZoom
        }
      ... on documents_Asset {
          enableZoom
        }
  }
  typeHandle
  title
}`;

const callToActionQuery = ` 
... on callToAction_Entry {
  enabled
  typeHandle
  images {
    ${imagesQuery}
  }
  title
  headline
  copy
  button {
    ${buttonQuery}
  }
}`;

export const embedCodeQuery = `
... on embedCode_Entry{
   embedUrl
   enabled
   typeHandle
}
`

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
`

export {
  copyBlockQuery,
  imageBlockQuery,
  callToActionQuery,
}