import React from 'react'
import Description from './description'
import { Flex, Box, Container, Center } from '@chakra-ui/react'
import AboutUs from './how-it-works'
import SignUp from './signup'
import DaosWindow from './daoWindow'

const Home = () => {
    return (
        <Box>
            <Description />
            <DaosWindow />
            <AboutUs />
            <SignUp />
        </Box>
    )
}

export default Home
