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
    }, [router.query.code])

    //
    return (
        <Box>
            <Registration user={user} />
        </Box>
    )
}

export default RegistrationPage
