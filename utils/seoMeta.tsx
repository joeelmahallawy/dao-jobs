import { NextSeoProps } from 'next-seo'
import image from '../attachments/daojobs-img.png'
const config = {
    author: 'Dao Jobz',
    siteName: 'Dao Jobz',
    siteDescription: `Come work for a DAO and get compensated in cryptocurrency!`,
    defaultPageTitle: 'Dao Job board',
    blogTitle: 'Dao Jobz',
    baseUrl: 'https://www.daojobz.xyz/',
    websiteLogo: image.src,
}
export default config

type DataType = {
    title?: string
    seoDescription?: string
    canonicalUrl?: string
    imageUrl?: string
    slug?: string
    publishDate?: string
    modifiedDate?: string
}

const getImage = (data: DataType = {}) => {
    if (data.imageUrl) {
        return [
            { url: data.imageUrl, width: 600, height: 300, alt: data.title },
        ]
    }
    if (data.slug) {
        return [
            {
                url: `/${data.slug}`,
                width: 600,
                height: 300,
                alt: data.title,
            },
        ]
    }
    return [
        {
            url: config.websiteLogo,
            width: 280,
            height: 280,
            alt: 'Dao Jobz',
        },
    ]
}

export function createSEOConfig(data: DataType = {}): NextSeoProps {
    const title = data.title || config.defaultPageTitle
    const description = data.seoDescription
        ? data.seoDescription
        : config.siteDescription

    return {
        title,
        description,
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: data.canonicalUrl,
            title,
            description,
            images: getImage(data),
            site_name: config.siteName,
        },
    }
}
