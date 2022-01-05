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

    const handleAuthChange = async (event, session) => {
        await fetch('http://localhost:3000/api/auth', {
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

    return (
        <RecoilRoot>
            <ChakraProvider theme={Chakratheme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    )
}
export default MyApp
