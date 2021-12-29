import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { userData } from '../../recoil'
import Footer from './footer'
import Header from './header'
import { useRecoilState, useRecoilValue } from 'recoil'
import DiscordOauth2 from 'discord-oauth2'

// where'd you go bro?
type Props = {
    children: React.ReactNode
}
const Layout = ({ children }: Props) => {
    const [user, setUser] = useRecoilState(userData)

    // Make sure to login the user on every page mount (necessary for protected routes)
    useEffect(() => {
        // If tokens exist in localstorage
        if (localStorage.getItem('tokens')) {
            // parse tokens json from localstorage
            const tokens = JSON.parse(localStorage.getItem('tokens'))

            // new discord oath instance
            const oauth = new DiscordOauth2()

            // localstorage discord access token
            const access_token = tokens.access_token

            // Token has expired function
            const expiredToken = (error) => {
                // Refresh token
                oauth
                    .tokenRequest({
                        clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
                        clientSecret:
                            process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
                        code: router.query.code,
                        scope: 'identify',
                        grantType: 'refresh_token',
                        refreshToken: tokens.refresh_token,
                    })
                    .then((res) => {
                        // save token to localStorage
                        localStorage.setItem('tokens', JSON.stringify(res))
                        // get user with access token
                        oauth
                            .getUser(res.access_token)
                            .then((res) => setUser(res))
                    })
            }

            // Login user if user object was obtained successfully
            const loginUser = (res) => setUser(res)

            // If token exists in localstorage => get userobject
            oauth
                .getUser(access_token)
                .then((res) => loginUser(res))
                .catch((error) => expiredToken(error)) // on error, assume token has expired and refresh
        }
    }, [])

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
export default Layout
