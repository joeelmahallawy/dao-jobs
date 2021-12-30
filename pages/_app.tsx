import { ChakraProvider, extendTheme, theme } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { Chakratheme } from '../utils/theme'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/900.css'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { UserProvider } from '@auth0/nextjs-auth0'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <UserProvider>
            <RecoilRoot>
                <ChakraProvider theme={Chakratheme}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </RecoilRoot>
        </UserProvider>
    )
}
export default MyApp
