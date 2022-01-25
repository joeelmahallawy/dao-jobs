import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Daos, Jobs } from '../../utils/types'
import RenderDaos from './renderDaos'
import RenderJobs from './renderJobs'

const JobSeekerMainPage = ({ daos, jobs }: { daos: Daos[]; jobs: Jobs[] }) => {
    console.log('from seeker', jobs)
    return (
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
