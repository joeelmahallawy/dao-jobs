import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import DiscordOauth2 from 'discord-oauth2'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useGlobalUser, userData } from '../recoil'
import getSessionTokens from '../helpers/getSessionTokens'

const RegistrationPage = () => {
    const [user, setUser] = useRecoilState(userData)
    const router = useRouter()
    useEffect(() => {
        // check if tokens doesn't exist in local storage, otherwise use code in URL to get tokens
        if (!localStorage.getItem('tokens')) getSessionTokens(router, setUser)

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
    }, [router.query.code])

    //
    return (
        <Box>
            <Registration user={user} />
        </Box>
    )
}

export default RegistrationPage
