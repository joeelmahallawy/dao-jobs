import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { Chakratheme } from '../utils/theme'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/900.css'
// import '@fontsource/'
import React, { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { supabase } from '../lib/supabase'
import { DefaultSeo } from 'next-seo'
import { createSEOConfig } from '../utils/seoMeta'
import Head from 'next/head'
import icon from '../attachments/daojobs-icon.ico'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'
import Script from 'next/script'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    const [authenticatedState, setAuthenticatedState] =
        useState('not-authenticated')

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const user = supabase.auth.user()
                if (user) {
                    handleAuthChange(event, session)
                }
                console.log(event)
                if (event === 'SIGNED_IN') {
                    setAuthenticatedState('authenticated')
                }

                if (event === 'SIGNED_OUT') {
                    setAuthenticatedState('not-authenticated')
                }
            },
        )
        checkUser()
        return () => {
            authListener.unsubscribe()
        }
    }, [])

    const checkUser = async () => {
        const user = await supabase.auth.user()
        if (user) {
            setAuthenticatedState('authenticated')
        }
    }
    // process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

    const handleAuthChange = async (event, session) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            credentials: 'same-origin',
            body: JSON.stringify({
                event,
                session,
            }),
        })
    }

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
