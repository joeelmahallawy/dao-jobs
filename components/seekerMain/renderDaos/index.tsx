import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Image,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { Daos, Jobs } from '../../../utils/types'
import { theme } from '../../../utils/theme'
import getJobsForDao from '../../../helpers/graphql/queries/getJobsForDao'
import ShowJobsForCurrentDao from '../renderJobsForDao'
import RenderJobsForDao from '../renderJobsForDao'

const RenderDaos = ({ daos }: { daos: Daos[] }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentJobs, setCurrentJobs] = useState<Jobs[]>([])

    return (
        <>
            {daos.map((dao, i) => (
                <Center
                    onClick={async () => {
                        onOpen()
                        const jobs = await getJobsForDao(dao)
                        setCurrentJobs([...jobs])
                    }}
                    key={Math.random() * 9999}
                    m="auto"
                    borderRadius={5}
                    _hover={{
                        outline: '3px solid gray',
                        cursor: 'pointer',
                    }}
                    fontFamily="Arial"
                    w={['100%', '100%', '85%']}
                    outline="2px solid gray"
                    mt="1.5rem"
                    p={[5, 6, 7]}
                    justifyContent="space-between"
                >
                    <Center gap={3}>
                        <Box borderRadius="50%" outline="2px solid gray" p={1}>
                            <Image
                                w="50px"
                                h="50px"
                                borderRadius="50%"
                                src={dao.discordServerPicURL}
                            />
                        </Box>
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
                    </Center>
                    <Button colorScheme="linkedin">Check out DAO</Button>
                    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent fontFamily="Arial">
                            <ModalBody>
                                <Center flexDir="column">
                                    <Box w="100%" borderRadius={10}>
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
                                                        borderRadius="50%"
                                                        border="2px solid black"
                                                        h={[
                                                            '2rem',
                                                            '3rem',
                                                            '3.5rem',
                                                            '4rem',
                                                            '5rem',
                                                        ]}
                                                        w={[
                                                            '2rem',
                                                            '3rem',
                                                            '3.5rem',
                                                            '4rem',
                                                            '5rem',
                                                        ]}

                                                        // p="0.5rem"
                                                    >
                                                        <Image
                                                            src={
                                                                dao.discordServerPicURL
                                                            }
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
                                                        {dao.nameOfDao}
                                                    </Heading>
                                                </Center>

                                                <Center
                                                    flexDir="column"
                                                    p={3}
                                                    fontFamily="Arial"
                                                >
                                                    <Text
                                                        fontSize={[
                                                            '1rem',
                                                            '1rem',
                                                            '1.25rem',
                                                            '1.25rem',
                                                            '1.5rem',
                                                        ]}
                                                        fontFamily="Poppins"
                                                    >{`${dao.discordPopulation} discord members`}</Text>
                                                    <Flex
                                                        gap={[
                                                            '0.75rem',
                                                            '1rem',
                                                            '2rem',
                                                        ]}
                                                    >
                                                        {!dao.discordLink ||
                                                        dao.discordLink.toLowerCase() !=
                                                            'n/a' ? (
                                                            <Link
                                                                _focus={{}}
                                                                _hover={{
                                                                    cursor: 'pointer',
                                                                }}
                                                                isExternal
                                                                href={
                                                                    dao.discordLink
                                                                }
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
                                                        {!dao.twitterUrl ||
                                                        dao.twitterUrl.toLowerCase() !=
                                                            'n/a' ? (
                                                            <Link
                                                                _focus={{}}
                                                                _hover={{
                                                                    cursor: 'pointer',
                                                                }}
                                                                isExternal
                                                                href={
                                                                    dao.twitterUrl
                                                                }
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
                                                    <span
                                                        style={{
                                                            color: theme.colors
                                                                .PrimaryBlue,
                                                        }}
                                                    >
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
                                                    {dao.briefDescription}
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
                                                    <span
                                                        style={{
                                                            color: theme.colors
                                                                .PrimaryBlue,
                                                        }}
                                                    >
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
                                                    {dao.daoGoals}
                                                </Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* TODO:RENDER JOBS */}
                                    <RenderJobsForDao
                                        dao={dao}
                                        jobs={currentJobs}
                                    />
                                </Center>
                            </ModalBody>

                            <ModalFooter>
                                <Button mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Link
                                    href={`https://discord.com/users/${dao.employerId}`}
                                    _focus={{}}
                                    isExternal
                                    _hover={{}}
                                >
                                    <Button colorScheme="blue" mr={3}>
                                        Message employer
                                    </Button>
                                </Link>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Center>
            ))}
        </>
    )
}

export default RenderDaos
