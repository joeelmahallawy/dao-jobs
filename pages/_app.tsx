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
import ReactGA from 'react-ga'
import Script from 'next/script'
import App, { AppProps } from 'next/app'
import { useRouter } from 'next/router'
// const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
//     return (

//     )
// }
// export default MyApp

export default class MyApp extends App {
    async componentDidMount() {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)
            this.logPageView()
        }
    }

    componentDidUpdate() {
        this.logPageView()
    }

    logPageView = () => {
        const router = useRouter()

        if (process.env.NODE_ENV === 'production') {
            ReactGA.pageview(router.asPath)
        }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <>
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
                            {/* <Script
                                strategy="lazyOnload"
                                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                            />
                            <Script id="ga-analytics">
                                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
                            </Script> */}
                            <Component {...pageProps} />
                        </Layout>
                    </ChakraProvider>
                </RecoilRoot>
            </>
        )
    }
}
