import { Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import Footer from './footer'
import Header from './header'

type Props = {
    children: React.ReactNode
    page: string
}
const Layout = ({ children, page }: Props) => {
    return (
        <>
            <Header page={page} />
            {children}
            <Footer />
        </>
    )
}
export default Layout
