import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SignUpButton from '../../reusables/signUpButton'
import LogoutButton from '../../reusables/logoutButton'
import Logo from './logo'
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter()

    return (
        <Center
            id="navbar"
            p={[1, 3, 5, 7, 7, 10]}
            justifyContent="space-between"
            bg="#F1F4FF"
        >
            <Logo />

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
