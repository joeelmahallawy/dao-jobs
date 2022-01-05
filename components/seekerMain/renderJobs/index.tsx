import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Text,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import request, { gql } from 'graphql-request'
import React, { useState } from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import capitalize from '../../../helpers/capitalize'
import getDaoNameById from '../../../helpers/graphql/queries/getDaoNameById'
import getEmployerForJob from '../../../helpers/graphql/queries/getEmployerForJob'
import { Jobs } from '../../../utils/types'
type Employer = {
    discordUsername: string
    profilePicURL: string
}

const RenderJobs = ({ jobs }: { jobs: Jobs[] }) => {
    const [employer, setEmployer] = useState<Employer>()
    const [daoName, setDaoName] = useState('')
    const [serverPic, setServerPic] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log('daoname', daoName)
    return (
        <>
            {jobs.map((job, i) => (
                <Center
                    m="auto"
                    key={i}
                    onClick={async () => {
                        getEmployerForJob(job, setEmployer)
                        getDaoNameById(job, setDaoName, setServerPic)
                        onOpen()
                    }}
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
                        {capitalize(job.jobTitle)}
                    </Heading>
                    <Button colorScheme="teal">Check out job</Button>

                    <Modal
                        // size={['lg', 'xl', 'xl', '2xl', '3xl']}
                        size="3xl"
                        blockScrollOnMount={false}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent fontFamily="Arial">
                            <Center justifyContent="space-between" p={5}>
                                <Box w="100%">
                                    <Center
                                        justifyContent="space-between"
                                        fontSize="1.5rem"
                                        gap={3}
                                        mb={7}
                                        // bg="red"
                                    >
                                        {/* Dao:{' '} */}
                                        <Flex gap={3}>
                                            <Box
                                                w="40px"
                                                h="40px"
                                                borderRadius="50%"
                                                outline="2.5px solid gray"
                                                p={1}
                                            >
                                                <Image
                                                    h="100%"
                                                    w="100%"
                                                    borderRadius="50%"
                                                    src={serverPic}
                                                />
                                            </Box>
                                            <span
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: '2rem',
                                                }}
                                            >
                                                {daoName}
                                            </span>
                                        </Flex>
                                        <Link
                                            _focus={{}}
                                            _hover={{}}
                                            isExternal
                                            href={`https://discord.com/users/${job.employerID}`}
                                        >
                                            <Box>
                                                <Center
                                                    _hover={{
                                                        cursor: 'pointer',
                                                    }}
                                                    display={[
                                                        'block',
                                                        'block',
                                                        'flex',
                                                        'flex',
                                                        'flex',
                                                    ]}
                                                    justifyContent="flex-end"
                                                >
                                                    <Text
                                                        fontSize={[
                                                            '0.75rem',
                                                            '0.75rem',
                                                            '1rem',
                                                            '1rem',
                                                            '1.25rem',
                                                        ]}
                                                    >
                                                        Posted by:{' '}
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    '600',
                                                            }}
                                                        >
                                                            {employer &&
                                                                capitalize(
                                                                    employer?.discordUsername,
                                                                )}
                                                        </span>
                                                    </Text>
                                                    <Box
                                                        // ml="auto"
                                                        // ml={1}
                                                        w={[
                                                            '30px',
                                                            '40px',
                                                            '40px',
                                                            '50px',
                                                            '60px',
                                                        ]}
                                                        h={[
                                                            '30px',
                                                            '40px',
                                                            '40px',
                                                            '50px',
                                                            '60px',
                                                        ]}
                                                        borderRadius="50%"
                                                        border="2px solid gray"
                                                    >
                                                        <Image
                                                            h="100%"
                                                            w="100%"
                                                            borderRadius="50%"
                                                            src={
                                                                employer?.profilePicURL
                                                            }
                                                        />
                                                    </Box>
                                                </Center>
                                            </Box>
                                            {/* <Text fontSize="1.5rem">
                                        Dao:{' '}
                                        <span style={{ fontWeight: '600' }}>
                                            {daoName}
                                        </span>
                                    </Text> */}
                                        </Link>
                                    </Center>
                                    <Heading
                                        fontFamily="Poppins"
                                        fontWeight="500"
                                        // w="50%"
                                        fontSize={[
                                            '1.25rem',
                                            '1.5rem',
                                            '1.75rem',
                                            '2rem',
                                            '2rem',
                                        ]}
                                    >
                                        {job && capitalize(job.jobTitle)}
                                    </Heading>
                                </Box>

                                {/* get employer who posted it */}
                            </Center>

                            <ModalBody>
                                <Box
                                    fontSize={[
                                        '0.75rem',
                                        '0.75rem',
                                        '1rem',
                                        '1rem',
                                        '1rem',
                                    ]}
                                >
                                    <Text
                                        fontSize={[
                                            '0.75rem',
                                            '1rem',
                                            '1.1rem',
                                            '1.3rem',
                                            '1.4rem',
                                        ]}
                                        fontWeight="bold"
                                        mb="1rem"
                                    >
                                        Description
                                    </Text>
                                    {job.jobDescription}
                                </Box>
                                <Box
                                    mt={3}
                                    fontSize={[
                                        '0.75rem',
                                        '0.75rem',
                                        '1rem',
                                        '1rem',
                                        '1rem',
                                    ]}
                                >
                                    <Text
                                        fontSize={[
                                            '0.75rem',
                                            '1rem',
                                            '1.1rem',
                                            '1.3rem',
                                            '1.4rem',
                                        ]}
                                        fontWeight="bold"
                                        mb="1rem"
                                    >
                                        Method of compensation
                                    </Text>
                                    {job.currencyOfCompensation}
                                </Box>
                                <Box mt={3}>
                                    <Text
                                        fontSize={[
                                            '0.75rem',
                                            '1rem',
                                            '1.1rem',
                                            '1.3rem',
                                            '1.4rem',
                                        ]}
                                        fontWeight="bold"
                                        mb="1rem"
                                    >
                                        Token exists
                                    </Text>
                                </Box>
                                {job.tokenExists ? (
                                    <>
                                        <Flex
                                            fontSize={[
                                                '0.75rem',
                                                '0.75rem',
                                                '1rem',
                                                '1rem',
                                                '1rem',
                                            ]}
                                            gap={3}
                                        >
                                            Yes
                                            <AiFillCheckCircle
                                                color="green"
                                                size={20}
                                            />
                                        </Flex>
                                        <Box
                                            mt={3}
                                            fontSize={[
                                                '0.75rem',
                                                '0.75rem',
                                                '1rem',
                                                '1rem',
                                                '1rem',
                                            ]}
                                        >
                                            <Text
                                                fontSize={[
                                                    '0.75rem',
                                                    '1rem',
                                                    '1.1rem',
                                                    '1.3rem',
                                                    '1.4rem',
                                                ]}
                                                fontWeight="bold"
                                                mb="1rem"
                                            >
                                                Token symbol
                                            </Text>
                                            {job.tokenSymbol}
                                        </Box>
                                        <Box
                                            mt={3}
                                            fontSize={[
                                                '0.75rem',
                                                '0.75rem',
                                                '1rem',
                                                '1rem',
                                                '1rem',
                                            ]}
                                        >
                                            <Text
                                                fontSize={[
                                                    '0.75rem',
                                                    '1rem',
                                                    '1.1rem',
                                                    '1.3rem',
                                                    '1.4rem',
                                                ]}
                                                fontWeight="bold"
                                                mb="1rem"
                                            >
                                                Token price
                                            </Text>
                                            {`$${job.tokenPrice} USD`}
                                        </Box>
                                        <Box mt={3}>
                                            <Text
                                                fontSize={[
                                                    '0.75rem',
                                                    '1rem',
                                                    '1.1rem',
                                                    '1.3rem',
                                                    '1.4rem',
                                                ]}
                                                fontWeight="bold"
                                                mb="1rem"
                                            >
                                                Token address
                                            </Text>
                                            {job.tokenAddress}
                                        </Box>
                                    </>
                                ) : (
                                    <Flex
                                        fontSize={[
                                            '0.75rem',
                                            '0.75rem',
                                            '1rem',
                                            '1rem',
                                            '1rem',
                                        ]}
                                        gap={3}
                                    >
                                        No
                                        <AiFillCloseCircle
                                            color="red"
                                            size={20}
                                        />
                                    </Flex>
                                )}
                                <Box mt={3}>
                                    <Text
                                        fontSize={[
                                            '0.75rem',
                                            '1rem',
                                            '1.1rem',
                                            '1.3rem',
                                            '1.4rem',
                                        ]}
                                        fontWeight="bold"
                                        mb="1rem"
                                    >
                                        Salary
                                    </Text>
                                    {job.approximateSalary}
                                </Box>
                                <Box mt={3}>
                                    <Text
                                        fontSize={[
                                            '0.75rem',
                                            '1rem',
                                            '1.1rem',
                                            '1.3rem',
                                            '1.4rem',
                                        ]}
                                        fontWeight="bold"
                                        mb="1rem"
                                    >
                                        Salary negotiable
                                    </Text>
                                    {job.salaryNegotiable ? (
                                        <Flex
                                            fontSize={[
                                                '0.75rem',
                                                '0.75rem',
                                                '1rem',
                                                '1rem',
                                                '1rem',
                                            ]}
                                            gap={3}
                                        >
                                            Yes
                                            <AiFillCheckCircle
                                                color="green"
                                                size={20}
                                            />
                                        </Flex>
                                    ) : (
                                        <Flex
                                            fontSize={[
                                                '0.75rem',
                                                '0.75rem',
                                                '1rem',
                                                '1rem',
                                                '1rem',
                                            ]}
                                            gap={3}
                                        >
                                            No
                                            <AiFillCloseCircle
                                                color="red"
                                                size={20}
                                            />
                                        </Flex>
                                    )}
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Link
                                    href={`https://discord.com/users/${job.employerID}`}
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

export default RenderJobs
