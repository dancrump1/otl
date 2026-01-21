interface ISeoProps {
    metaTitleContainer: string
    metaTagContainer: string
    metaLinkContainer: string
    metaJsonLdContainer: string
}

type Meta = { [k: string]: any }



export interface ISEO {
    title: string
    meta: Meta[]
    links: Meta[]
    jsonLd: Meta[]
}



export default function parseSEO(seo: ISeoProps): ISEO {


    return ({
        title: seo?.title,
        description: seo?.description,
        advanced: seo?.advanced,
        twitter: seo?.social?.twitter,
        facebook: seo?.social?.facebook,
    })
}