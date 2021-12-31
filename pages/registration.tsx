import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import DiscordOauth2 from 'discord-oauth2'
import { supabase } from '../lib/supabase'
import { useRecoilState } from 'recoil'
import EmployerMainPage from './employerMain'
import EmployerForm from '../components/registration/employerForm'

const RegistrationPage = ({ user }) => {
    // const user = Object.keys(props).length > 0 && props.user
    if (!user) {
        return <Heading>Not logged in</Heading>
    }

    // if (!user) {e
    // }
    return (
        // <Button
        //     onClick={async () => {
        //         await supabase.auth.signIn(
        //             {
        //                 provider: 'discord',
        //             },
        //             {
        //                 scopes: 'identify',
        //                 redirectTo: '/registration',
        //             },
        //         )
        //     }}
        // >
        <Registration user={user} />
    )
}

export const getServerSideProps = async ({ req }) => {
    const user = await supabase.auth.api.getUserByCookie(req)

    if (!user.user)
        return {
            props: {},
            // redirect: { destination: '/seekerMain' },
        }
    else return { props: { user: user.user.user_metadata } }
}
export default RegistrationPage
