import React from 'react'
import Description from './description'
import { Flex, Box, Container, Center } from '@chakra-ui/react'
import AboutUs from './how-it-works'
import SignUp from './signup'
import Link from 'next/link'

const Home = () => {
    return (
        <Box>
            <Link href="/api/auth/login">LOG IN</Link>
            <Description />
            <AboutUs />
            <SignUp />
        </Box>
    )
}

export default Home
