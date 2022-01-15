import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Menu,
    Image,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    Divider,
    Link,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SignUpButton from '../../reusables/signUpButton'
import LogoutButton from '../../reusables/logoutButton'
import Logo from './logo'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import userIsEmployer from '../../../helpers/graphql/queries/userIsEmployer'
import { GiHamburgerMenu } from 'react-icons/gi'
import { theme } from '../../../utils/theme'
import YouAreSigningUpHeader from '../../reusables/youAreSigningUp'

const LoggedInMenuButton = ({ user }) => {
    return (
        <Center>
            <Text
                fontSize="1.25rem"
                display={['none', 'none', 'block', 'block', 'block']}
            >
                {user?.name}
            </Text>
            <MenuButton
                _hover={{ opacity: '0.5' }}
                _focus={{}}
                _active={{}}
                as={Button}
            >
                <Box display={['block', 'block', 'none', 'none', 'none']}>
                    <GiHamburgerMenu fontSize="30px" />
                </Box>
                <Image
                    display={['none', 'none', 'block', 'block', 'block']}
                    boxSize="2rem"
                    borderRadius="full"
                    src={user?.picture}
                    alt="Profile Pic"
                    w="60px"
                    h="60px"
                    mr={10}
                />
            </MenuButton>
        </Center>
    )
}

type Props = {
    page: string
    isEmployer: boolean
}

const Header = ({ page }) => {
    const [isAnEmployer, setIsAnEmployer] = useState(false)
    const [user, setUser] = useState(null)
    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`,
            )
            const data = await response.json()
            setUser(data)
            const isEmployer: boolean = await userIsEmployer(data)
            if (isEmployer) setIsAnEmployer(true)
        })()
    }, [])

    if (page == '/employerMain') {
        return (
            <Center
                fontFamily="Arial"
                id="navbar"
                p={[1, 3, 5, 7, 7, 10]}
                justifyContent="space-between"
                bg="#F1F4FF"
            >
                <Logo />
                <Flex w="33%" justifyContent="flex-end" pr={5}>
                    <Menu>
                        <LoggedInMenuButton user={user} />
                        <MenuList>
                            <Link _hover={{}} href="/">
                                <MenuItem minH="48px">Home</MenuItem>
                            </Link>
                            <Divider />
                            <Link _hover={{}} href="/api/auth/logout">
                                <MenuItem minH="48px">Log out</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </Center>
        )
    }

    if (page == '/registration') {
        return <YouAreSigningUpHeader />
    }

    if (!user) {
        return (
            <Center
                id="navbar"
                p={[1, 3, 5, 7, 7, 10]}
                justifyContent="space-between"
                bg="#F1F4FF"
            >
                <Logo />
                <Flex w="33%" justifyContent="flex-end" pr={5}>
                    <SignUpButton />
                </Flex>
            </Center>
        )
    }

    if (user && isAnEmployer) {
        return (
            <Center
                fontFamily="Arial"
                id="navbar"
                p={[1, 3, 5, 7, 7, 10]}
                justifyContent="space-between"
                bg="#F1F4FF"
            >
                <Logo />
                <Flex justifyContent="flex-end" pr={5}>
                    <Menu placement="bottom-end">
                        <Center fontWeight="bold" gap={3}>
                            <LoggedInMenuButton user={user} />
                        </Center>
                        <MenuList>
                            <Link _hover={{}} href="/employerMain">
                                <MenuItem minH="48px">My DAO</MenuItem>
                            </Link>
                            <Divider />
                            <Link _hover={{}} href="/api/auth/logout">
                                <MenuItem minH="48px">Log out</MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </Flex>
            </Center>
        )
    }

    return (
        <Center
            fontFamily="Arial"
            id="navbar"
            p={[1, 3, 5, 7, 7, 10]}
            justifyContent="space-between"
            bg="#F1F4FF"
        >
            <Logo />
            <Flex w="33%" justifyContent="flex-end" pr={5}>
                <Menu>
                    <LoggedInMenuButton user={user} />
                    <MenuList>
                        <Link _hover={{}} href="/registration">
                            <MenuItem minH="48px">Register DAO</MenuItem>
                        </Link>
                        <Divider />
                        <Link _hover={{}} href="/api/auth/logout">
                            <MenuItem minH="48px">Log out</MenuItem>
                        </Link>
                    </MenuList>
                </Menu>
            </Flex>
        </Center>
    )
}
export default Header
