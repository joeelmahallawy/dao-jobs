import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { theme } from '../../../utils/theme'
import SignUpButton from '../../reusables/signUpButton'
import LogoutButton from '../../reusables/logoutButton'
import Logo from './logo'
import { userData } from '../../../lib/recoil'
import { useRecoilState, useRecoilValue } from 'recoil'

// yuss true
const Header = () => {
    const [user, setUser] = useRecoilState(userData)

    return (
        <Center
            id="navbar"
            p={[1, 3, 5, 7, 7, 10]}
            justifyContent="space-between"
            bg="#F1F4FF"
        >
            <Logo />
            <Center w="33%">
                <Flex bg="white" p={[0, 1, 1, 2, 3]} gap="1rem">
                    <Heading
                        fontSize={[
                            '0.75rem',
                            '1rem',
                            '1.25rem',
                            '1.5rem',
                            '2rem',
                        ]}
                        fontWeight="500"
                    >
                        Job Seekers:{' '}
                    </Heading>
                    <Heading
                        fontSize={[
                            '0.75rem',
                            '1rem',
                            '1.25rem',
                            '1.5rem',
                            '2rem',
                        ]}
                        color={theme.colors.PrimaryBlue}
                        fontWeight="bold"
                    >
                        12
                    </Heading>
                </Flex>
            </Center>
            <Flex w="33%" justifyContent="flex-end" pr={5}>
                {user ? <LogoutButton /> : <SignUpButton />}
            </Flex>
        </Center>
    )
}
export default Header
