import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userData } from '../../recoil'
import Footer from './footer'
import Header from './header'

// where'd you go bro?
type Props = {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
export default Layout
