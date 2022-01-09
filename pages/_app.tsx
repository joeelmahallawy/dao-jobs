import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { Chakratheme } from '../utils/theme'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/900.css'
import React, { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { DefaultSeo } from 'next-seo'
import { createSEOConfig } from '../utils/seoMeta'
import Head from 'next/head'
import icon from '../attachments/daojobs-icon.ico'

import Script from 'next/script'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <RecoilRoot>
            <ChakraProvider theme={Chakratheme}>
                <DefaultSeo {...createSEOConfig()} />
                <Head>
                    <link rel="icon" href={icon.src} />
                    <title>DaoJobz</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <Layout>
                    <Script
                        strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <Script id="ga-analytics">
                        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
                    </Script>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    )
}
export default MyApp
