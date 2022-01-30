import React, { useEffect, useState } from 'react'
import JobSeekerMainPage from '../components/seekerMain'
import getDaos from '../helpers/graphql/queries/getAllDaos'
import getJobs from '../helpers/getAllJobs'
import Layout from '../components/Layout'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ShimmerBlock from '../components/reusables/shimmerBlock'

const IndexPage = () => {
    const [daos, setDaos] = useState([])
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        ;(async () => {
            const data = await Promise.all([getDaos(), getJobs()])
            setDaos([...data[0]])
            setJobs([...data[1]])
            console.log('heres some data', data)
        })()
    }, [])
    return !daos.length || !jobs.length ? (
        <Layout page="/">
            <Box w="100%" h="80vh" pr={7} pl={3}>
                <Tabs
                    m={[1, 2, 3, 4, 5]}
                    fontFamily="Arial"
                    isFitted
                    variant="enclosed-colored"
                >
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
                            <ShimmerBlock />
                            <ShimmerBlock />
                            <ShimmerBlock />
                            <ShimmerBlock />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Layout>
    ) : (
        <Layout page="/">
            <JobSeekerMainPage daos={daos} jobs={jobs} />
        </Layout>
    )
}

export default IndexPage
