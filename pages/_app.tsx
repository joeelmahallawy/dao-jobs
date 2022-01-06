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
import ReactGA from 'react-ga'
import App from 'next/app'
import { useRouter } from 'next/router'

class MyApp extends App {
    async componentDidMount() {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.initialize('UA-216449673-1')
            this.logPageView()
            const [authenticatedState, setAuthenticatedState] =
                useState('not-authenticated')
            useEffect(() => {
                if (process.env.NODE_ENV === 'production') {
                    ReactGA.initialize('UA-216449673-1')
                    logPageView()
                }

                function logPageView() {
                    const router = useRouter()

                    if (process.env.NODE_ENV === 'production') {
                        ReactGA.pageview(router.pathname)
                    }
                }

                const { data: authListener } = supabase.auth.onAuthStateChange(
                    (event, session) => {
                        const user = supabase.auth.user()
                        if (user) {
                            handleAuthChange(event, session)
                        }
                        console.log('event and session', event, session)

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
            process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

            const handleAuthChange = async (event, session) => {
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        cookie: session.refresh_token,
                    }),
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        event,
                        session,
                    }),
                })
            }
        }
    }

    componentDidUpdate() {
        this.logPageView()
    }

    logPageView() {
        const { router } = this.props

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
                            <title>Anura DAO</title>
                            <meta
                                name="viewport"
                                content="initial-scale=1, width=device-width"
                            />
                        </Head>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ChakraProvider>
                </RecoilRoot>
            </>
        )
    }
}

export default MyApp
