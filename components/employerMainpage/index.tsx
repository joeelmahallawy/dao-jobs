import {
    Box,
    Center,
    Flex,
    Heading,
    Link,
    Text,
    Image,
    Button,
    Textarea,
    NumberInput,
    NumberInputField,
    useToast,
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
import { BiEditAlt } from 'react-icons/bi'
import updateCurrentDao from '../../helpers/graphql/mutations/updateDao'

export type Employer = {
    fullName: string
    profilePic: string
}

const EmployerMainPage = ({
    user,
    Dao,
    daoServerImageURL,
}: {
    user: AuthUser
    Dao: Dao
    daoServerImageURL: string
}) => {
    const [currentDao, setCurrentDao] = useState(Dao)
    const [jobs, setJobs] = useState([])
    const [employer, setEmployer] = useState<Employer>({
        fullName: currentDao.employerName,
        profilePic: currentDao.employerProfilePic,
    })
    const [currentImageUrl, setCurrentImageUrl] = useState(daoServerImageURL)
    const [requestIsSending, setRequestIsSending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const toast = useToast()

    useEffect(() => {
        // get all jobs for current dao
        getJobsForDao(Dao)
            .then((val) => setJobs(val))
            .catch((err) => console.error(err.message))
    }, [])

    function photoUpload(event, setProfilePic) {
        event.preventDefault()
        const reader = new FileReader()
        const file = event.target.files[0]
        reader.onloadend = () => {
            setProfilePic({
                file,
                imagePreviewUrl: reader.result,
            })
        }
        reader.readAsDataURL(file)
    }

    const [dp, setdp] = useState({
        file: '',
        imagePreviewUrl: currentImageUrl,
        active: 'edit',
    })
    // console.log(currentImageUrl)

    return (
        <Center fontFamily="Arial" flexDir="column" p="3rem">
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
                                {/* {isEditing ? (
                                    <>
                                        <label>
                                            <Image
                                                h="100%"
                                                w="100%"
                                                _hover={{
                                                    cursor: 'pointer',
                                                    opacity: '0.7',
                                                }}
                                                borderRadius="50%"
                                                src={dp.imagePreviewUrl}
                                            />
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                onChange={(e) => {
                                                    photoUpload(e, setdp)
                                                }}
                                            />
                                        </label>
                                    </>
                                ) : (
                                    )} */}
                                <Image
                                    src={currentImageUrl}
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
                                {currentDao.nameOfDao}
                            </Heading>
                        </Center>

                        <Center flexDir="column" p={3} fontFamily="Arial">
                            {isEditing ? (
                                <Box fontSize="1.15rem">
                                    Number of discord members
                                    <NumberInput
                                        mt={3}
                                        mb={3}
                                        defaultValue={
                                            currentDao.discordPopulation
                                        }
                                    >
                                        <NumberInputField
                                            onChange={(e) => {
                                                setCurrentDao({
                                                    ...currentDao,
                                                    discordPopulation:
                                                        e.currentTarget.value,
                                                })
                                            }}
                                        />
                                    </NumberInput>
                                </Box>
                            ) : (
                                <Text
                                    fontSize={[
                                        '1rem',
                                        '1rem',
                                        '1.25rem',
                                        '1.25rem',
                                        '1.5rem',
                                    ]}
                                    fontFamily="Poppins"
                                >{`${currentDao.discordPopulation} discord members`}</Text>
                            )}
                            <Flex gap={['0.75rem', '1rem', '2rem']}>
                                {!currentDao.discordLink ||
                                currentDao.discordLink.toLowerCase() !=
                                    'n/a' ? (
                                    <Link
                                        _focus={{}}
                                        _hover={{ cursor: 'pointer' }}
                                        isExternal
                                        href={currentDao.discordLink}
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
                                {!currentDao.twitterUrl ||
                                currentDao.twitterUrl.toLowerCase() != 'n/a' ? (
                                    <Link
                                        _focus={{}}
                                        _hover={{ cursor: 'pointer' }}
                                        isExternal
                                        href={currentDao.twitterUrl}
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
                        <Flex justifyContent="space-between">
                            {isEditing ? (
                                <Textarea
                                    fontSize="1.25rem"
                                    onChange={(e) => {
                                        setCurrentDao({
                                            ...currentDao,
                                            briefDescription:
                                                e.currentTarget.value,
                                        })
                                    }}
                                    mt={[1, 2, 3, 5, 7]}
                                    defaultValue={currentDao.briefDescription}
                                />
                            ) : (
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
                                    {currentDao.briefDescription}
                                </Text>
                            )}
                        </Flex>
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
                        {isEditing ? (
                            <Textarea
                                fontSize="1.25rem"
                                onChange={(e) => {
                                    setCurrentDao({
                                        ...currentDao,
                                        daoGoals: e.currentTarget.value,
                                    })
                                }}
                                mt={[1, 2, 3, 5, 7]}
                                defaultValue={currentDao.daoGoals}
                            />
                        ) : (
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
                                {currentDao.daoGoals}
                            </Text>
                        )}
                    </Box>
                </Box>

                <Flex fontFamily="Arial" justifyContent="flex-end" p={3}>
                    {isEditing ? (
                        <Button
                            isLoading={requestIsSending}
                            _focus={{}}
                            onClick={async () => {
                                // console.log(dp.file)
                                setRequestIsSending(true)
                                // await supabase.storage
                                //     .from('dao-images')
                                //     .update(
                                //         `daos/${getUserId(user)}.png`,
                                //         dp.file,
                                //         {
                                //             cacheControl: '3600',
                                //             upsert: false,
                                //             contentType: 'image/png',
                                //         },
                                //     )

                                await updateCurrentDao(
                                    currentDao,
                                    setRequestIsSending,
                                    toast,
                                    user,
                                    dp,
                                )
                                setIsEditing(false)
                            }}
                            colorScheme="teal"
                            fontFamily="Arial"
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            _focus={{}}
                            onClick={() => {
                                setIsEditing(true)
                            }}
                        >
                            <BiEditAlt fontSize="1.5rem" />
                        </Button>
                    )}
                </Flex>
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
