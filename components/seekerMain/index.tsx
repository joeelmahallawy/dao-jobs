import {
    Button,
    Center,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react'
import React from 'react'
import { Daos, Jobs } from '../../utils/types'

const JobSeekerMainPage = ({ daos, jobs }: { daos: Daos[]; jobs: Jobs[] }) => {
    return (
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
                    {daos.map((dao, i) => (
                        <Center
                            key={i}
                            m="auto"
                            borderRadius={5}
                            _hover={{
                                outline: '3px solid gray',
                                cursor: 'pointer',
                            }}
                            fontFamily="Arial"
                            w="90%"
                            outline="2px solid gray"
                            mt="1.5rem"
                            p={[5, 6, 7]}
                            justifyContent="space-between"
                        >
                            <Heading
                                fontFamily="Arial"
                                fontWeight="500"
                                fontSize={[
                                    '1rem',
                                    '1.25rem',
                                    '1.5rem',
                                    '1.75rem',
                                    '2rem',
                                ]}
                            >
                                {dao.nameOfDao}
                            </Heading>
                            <Button colorScheme="teal">Check out job</Button>
                        </Center>
                    ))}
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
export default JobSeekerMainPage
