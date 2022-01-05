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
    const [daoLink, setDaoLink] = useState('')
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
                        getDaoNameById(
                            job,
                            setDaoName,
                            setServerPic,
                            setDaoLink,
                        )
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
                        size="3xl"
                        blockScrollOnMount={false}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <ModalOverlay />
                        <ModalContent fontFamily="Arial">
                            <ModalBody p={7}>
                                <Center justifyContent="space-between">
                                    <Flex w="100%" flexDir="column">
                                        <Heading
                                            fontWeight="600"
                                            fontFamily="Arial"
                                            // w="50%"
                                            fontSize={[
                                                '1.25rem',
                                                '1.5rem',
                                                '1.75rem',
                                                '2rem',
                                                '2rem',
                                            ]}
                                        >
                                            <span style={{ fontWeight: '400' }}>
                                                Job title:{' '}
                                            </span>
                                            {job && capitalize(job.jobTitle)}
                                        </Heading>

                                        <Link
                                            mt={5}
                                            _hover={{}}
                                            _focus={{}}
                                            isExternal
                                            href={daoLink}
                                        >
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
                                                >
                                                    Dao:
                                                </Text>
                                                <Center
                                                    p={2}
                                                    bg="gray.200"
                                                    _hover={{ bg: 'gray.300' }}
                                                    display="inline-flex"
                                                    borderRadius={5}
                                                    justifyContent="flex-start"
                                                    gap={3}
                                                >
                                                    {/*  */}
                                                    {daoName}
                                                    <Box
                                                        // ml="auto"
                                                        // ml={1}
                                                        w={[
                                                            '30px',
                                                            '40px',
                                                            '40px',
                                                            '50px',
                                                            '50px',
                                                        ]}
                                                        h={[
                                                            '30px',
                                                            '40px',
                                                            '40px',
                                                            '50px',
                                                            '50px',
                                                        ]}
                                                        borderRadius="50%"
                                                        border="2px solid gray"
                                                    >
                                                        <Image
                                                            h="100%"
                                                            w="100%"
                                                            borderRadius="50%"
                                                            src={serverPic}
                                                        />
                                                    </Box>
                                                </Center>
                                            </Box>
                                            {/* <Center
                                            mt={3}
                                            justifyContent="flex-start"
                                            gap={2}
                                            fontWeight="500"
                                            fontFamily="Arial"
                                            fontSize={[
                                                '0.75rem',
                                                '0.75rem',
                                                '1rem',
                                                '1rem',
                                                '1.25rem',
                                            ]}
                                        >
                                            DAO:
                                            <span
                                                style={{
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {daoName}
                                            </span>
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
                                        </Center> */}
                                        </Link>

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
                                            >
                                                Posted by:
                                            </Text>
                                            <Center
                                                justifyContent="flex-start"
                                                gap={3}
                                            >
                                                {employer &&
                                                    capitalize(
                                                        employer?.discordUsername,
                                                    )}
                                                <Box
                                                    // ml="auto"
                                                    // ml={1}
                                                    w={[
                                                        '30px',
                                                        '40px',
                                                        '40px',
                                                        '50px',
                                                        '50px',
                                                    ]}
                                                    h={[
                                                        '30px',
                                                        '40px',
                                                        '40px',
                                                        '50px',
                                                        '50px',
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
                                    </Flex>
                                </Center>

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
