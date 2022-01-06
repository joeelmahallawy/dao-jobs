import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { theme } from '../../../utils/theme'
import SignUpButton from '../../reusables/signUpButton'
import LogoutButton from '../../reusables/logoutButton'
import Logo from './logo'
import { userData } from '../../../lib/recoil'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'

// yuss true
const Header = () => {
    const [user, setUser] = useRecoilState(userData)

    const router = useRouter()
    console.log('router', router.pathname)
    return (
        <Center
            id="navbar"
            p={[1, 3, 5, 7, 7, 10]}
            justifyContent="space-between"
            bg="#F1F4FF"
        >
            <Logo />
            <Center w="33%"></Center>
            <Flex w="33%" justifyContent="flex-end" pr={5}>
                {router.pathname == '/registration' ||
                router.pathname == '/seekerMain' ||
                router.pathname == '/employerMain' ? (
                    <LogoutButton />
                ) : (
                    <SignUpButton />
                )}
            </Flex>
        </Center>
    )
}
export default Header
