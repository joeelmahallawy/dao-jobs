import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Image,
    useDisclosure,
} from '@chakra-ui/react'
import { gql } from 'apollo-server-micro'
import request from 'graphql-request'
import React, { useState } from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import capitalize from '../../helpers/capitalize'
import getEmployerForJob from '../../helpers/graphql/queries/getEmployerForJob'
import { Daos, Jobs } from '../../utils/types'
import DeleteJobPosting from '../employerMainpage/deleteJobPosting'
import RenderDaos from './renderDaos'
import RenderJobs from './renderJobs'

const JobSeekerMainPage = ({ daos, jobs }: { daos: Daos[]; jobs: Jobs[] }) => {
    console.log('DAOS', daos)
    console.log(jobs)

    return (
        <Box h="80vh">
            <Tabs m={5} fontFamily="Arial" isFitted variant="enclosed-colored">
                <TabList mb="1em">
                    <Tab _focus={{}} _selected={{ bg: 'gray.300' }}>
                        Daos
                    </Tab>
                    <Tab _focus={{}} _selected={{ bg: 'gray.300' }}>
                        Jobs
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <RenderDaos daos={daos} />
                    </TabPanel>
                    <TabPanel>
                        <RenderJobs jobs={jobs} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
export default JobSeekerMainPage
