import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import DiscordOauth2 from 'discord-oauth2'
import { supabase } from '../lib/supabase'
import { useRecoilState } from 'recoil'
import EmployerMainPage from './employerMain'
import EmployerForm from '../components/registration/employerForm'

const RegistrationPage = ({
    user: {
        user: { user_metadata: user },
    },
}) => {
    console.log(user)
    return (
        <Center>
            <Registration user={user} />
        </Center>
    )
}

export const getServerSideProps = async ({ req }) => {
    const user = await supabase.auth.api.getUserByCookie(req)
    if (!user.user)
        return {
            props: {},
            // redirect: { destination: '/seekerMain' },
        }
    else return { props: { user } }
}
export default RegistrationPage
