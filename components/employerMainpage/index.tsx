import {
    Box,
    Center,
    Flex,
    Heading,
    Link,
    Text,
    Image,
    Button,
} from '@chakra-ui/react'
import { theme } from '../../utils/theme'
import React, { useEffect, useState } from 'react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import AddJobPostingModal from './createJobPostingModal'
import getJobsForDao from '../../helpers/graphql/queries/getJobsForDao'
import JobPostingModal from './jobPostingModal'
import { supabase } from '../../lib/supabase'
import { AuthUser } from '../../interfaces'
import { Dao } from '../../utils/types'
import img from '../../attachments/daojobs-bg.png'
import getUserId from '../../helpers/getUserID'

export type Employer = {
    fullName: string
    profilePic: string
}

const EmployerMainPage = ({
    user,
    Dao,
    daoServerImageURL,
    forceUpdate,
}: {
    user: AuthUser
    Dao: Dao
    daoServerImageURL: string
    forceUpdate: Function
}) => {
    const [jobs, setJobs] = useState([])
    const [employer, setEmployer] = useState<Employer>({
        fullName: Dao.employerName,
        profilePic: Dao.employerProfilePic,
    })

    useEffect(() => {
        // get all jobs for current dao
        getJobsForDao(Dao)
            .then((val) => setJobs(val))
            .catch((err) => console.error(err.message))
    }, [])

    return (
        <Center flexDir="column" p="3rem">
            <Box
                w={['100%', '100%', '70%', '70%', '70%', '60%']}
                borderRadius={10}
                outline="2px solid gray"
                flexDir="column"
            >
                <Box>
                    <Flex
                        pt={3}
                        pb={3}
                        pl={[0, 2, 4, 6, 8]}
                        pr={[0, 2, 4, 6, 8]}
                        w="100%"
                        justifyContent="space-between"
                    >
                        <Center gap="1rem">
                            <Box
                                bg="gray.200"
                                borderRadius="50%"
                                border="2px solid black"
                                h={['2rem', '3rem', '3.5rem', '4rem', '5rem']}
                                w={['2rem', '3rem', '3.5rem', '4rem', '5rem']}
                            >
                                <Image
                                    src={daoServerImageURL}
                                    borderRadius="100%"
                                    h="100%"
                                    w="100%"
                                />
                            </Box>

                            <Heading
                                fontSize={[
                                    '1rem',
                                    '1.25rem',
                                    '1.5rem',
                                    '1.75rem',
                                    '2rem',
                                ]}
                            >
                                {Dao.nameOfDao}
                            </Heading>
                        </Center>

                        <Center flexDir="column" p={3} fontFamily="Arial">
                            <Text
                                fontSize={[
                                    '1rem',
                                    '1rem',
                                    '1.25rem',
                                    '1.25rem',
                                    '1.5rem',
                                ]}
                                fontFamily="Poppins"
                            >{`${Dao.discordPopulation} discord members`}</Text>
                            <Flex gap={['0.75rem', '1rem', '2rem']}>
                                {!Dao.discordLink ||
                                Dao.discordLink.toLowerCase() != 'n/a' ? (
                                    <Link
                                        _focus={{}}
                                        _hover={{ cursor: 'pointer' }}
                                        isExternal
                                        href={Dao.discordLink}
                                    >
                                        <Box
                                            _hover={{
                                                bg: '#5865F2',
                                                color: 'white',
                                            }}
                                            borderRadius="50%"
                                            border="5px solid #5865F2"
                                            fontSize={[
                                                '1rem',
                                                '1.25rem',
                                                '1.5rem',
                                                '1.75rem',
                                                '2rem',
                                            ]}
                                            p={[
                                                '0rem',
                                                '0.25rem',
                                                '0.5rem',
                                                '0.75rem',
                                                '1rem',
                                            ]}
                                        >
                                            <FaDiscord />
                                        </Box>
                                    </Link>
                                ) : null}
                                {!Dao.twitterUrl ||
                                Dao.twitterUrl.toLowerCase() != 'n/a' ? (
                                    <Link
                                        _focus={{}}
                                        _hover={{ cursor: 'pointer' }}
                                        isExternal
                                        href={Dao.twitterUrl}
                                    >
                                        <Box
                                            _hover={{
                                                bg: '#00acee',
                                                color: 'white',
                                            }}
                                            borderRadius="50%"
                                            border="5px solid #00acee"
                                            fontSize={[
                                                '1rem',
                                                '1.25rem',
                                                '1.5rem',
                                                '1.75rem',
                                                '2rem',
                                            ]}
                                            p={[
                                                '0rem',
                                                '0.25rem',
                                                '0.5rem',
                                                '0.75rem',
                                                '1rem',
                                            ]}
                                        >
                                            <FaTwitter />
                                        </Box>
                                    </Link>
                                ) : null}
                            </Flex>
                        </Center>
                    </Flex>
                    <Box p={[1, 3, 5, 7, 9]}>
                        <Heading
                            fontSize={[
                                '1.25rem',
                                '1.5rem',
                                '1.75rem',
                                '2.25rem',
                                '2.5rem',
                            ]}
                            fontFamily="Arial"
                        >
                            <span style={{ color: theme.colors.PrimaryBlue }}>
                                Dao{' '}
                            </span>
                            description
                        </Heading>
                        <Text
                            fontFamily="Arial"
                            fontSize={[
                                '1rem',
                                '1rem',
                                '1.4rem',
                                '1.5rem',
                                '1.5rem',
                            ]}
                            mt={[1, 2, 3, 5, 7]}
                        >
                            {Dao.briefDescription}
                        </Text>
                    </Box>
                    <Box p={[1, 3, 5, 7, 9]}>
                        <Heading
                            fontSize={[
                                '1.25rem',
                                '1.5rem',
                                '1.75rem',
                                '2.25rem',
                                '2.5rem',
                            ]}
                            fontFamily="Arial"
                        >
                            <span style={{ color: theme.colors.PrimaryBlue }}>
                                Dao{' '}
                            </span>
                            goals
                        </Heading>
                        <Text
                            fontFamily="Arial"
                            fontSize={[
                                '1rem',
                                '1rem',
                                '1.4rem',
                                '1.5rem',
                                '1.5rem',
                            ]}
                            mt={[1, 3, 5, 7, 10]}
                        >
                            {Dao.daoGoals}
                        </Text>
                    </Box>
                </Box>
            </Box>
            {jobs.map((job, i) => {
                return (
                    <JobPostingModal
                        jobs={jobs}
                        setJobs={setJobs}
                        key={i}
                        job={job}
                        employer={employer}
                    />
                )
            })}

            <AddJobPostingModal
                user={user}
                dao={Dao}
                setJobs={setJobs}
                jobs={jobs}
            />
        </Center>
    )
}
export default EmployerMainPage
