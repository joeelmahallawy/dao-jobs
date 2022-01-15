import { Center, Flex, Heading } from '@chakra-ui/react'
import React from 'react'
import { theme } from '../../utils/theme'
import Logo from '../Layout/header/logo'

const YouAreSigningUpHeader = () => (
    <Center
        id="navbar"
        p={[1, 3, 5, 7, 7, 10]}
        justifyContent="space-between"
        bg="#F1F4FF"
    >
        <Logo />
        <Flex w="33%" justifyContent="flex-end" pr={5}>
            <Heading
                fontWeight="500"
                fontSize={['0.6rem', '0.9rem', '1.25rem', '1.75rem', '2rem']}
            >
                You are signing
                <span
                    style={{
                        color: theme.colors.PrimaryBlue,
                        fontWeight: 'bold',
                    }}
                >
                    {' '}
                    up
                </span>
            </Heading>
        </Flex>
    </Center>
)
export default YouAreSigningUpHeader
