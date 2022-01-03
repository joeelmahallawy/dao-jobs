import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import DiscordOauth2 from 'discord-oauth2'
import { supabase } from '../lib/supabase'
import { useRecoilState } from 'recoil'
import EmployerMainPage from './employerMain'
import EmployerForm from '../components/registration/employerForm'

const RegistrationPage = ({ user }) => {
    const [userData, setUserData] = useState(user)

    useEffect(() => {
        if (!userData) {
            ;(async function () {
                const data = await supabase.auth.user()
                setUserData(data)
            })()
        }
    })
    return <Registration user={userData} />
}

export const getServerSideProps = async ({ req }) => {
    const response = await supabase.auth.api
        .getUserByCookie(req)
        .then((user) => {
            if (!user) {
                return { props: { user: null } }
            }

            return {
                props: {
                    user: user.user,
                },
            }
        })
        .catch((err) => {
            return {
                props: {
                    err: err.message,
                },
            }
        })
    return response
}
export default RegistrationPage
