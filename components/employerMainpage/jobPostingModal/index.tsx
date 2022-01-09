import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Text,
    Image,
    Flex,
    Heading,
    Center,
    Box,
    AlertIcon,
    Link,
    Alert,
} from '@chakra-ui/react'
import request, { gql } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import { Employer } from '..'
import capitalize from '../../../helpers/capitalize'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { Dao, JobPostingValues } from '../../../utils/types'
import DeleteJobPosting from '../deleteJobPosting'

const JobPostingModal = ({
    jobs,
    setJobs,
    job,
    employer,
}: {
    jobs: JobPostingValues[]
    setJobs: Function
    job: JobPostingValues
    employer: Employer
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Center
            onClick={onOpen}
            borderRadius={5}
            _hover={{ outline: '3px solid gray', cursor: 'pointer' }}
            fontFamily="Arial"
            w={['100%', '100%', '80%', '70%', '70%', '60%']}
            // p={5}
            // bg="gray.200"
            outline="2px solid gray"
            mt="1.5rem"
            p={[5, 6, 7]}
            justifyContent="space-between"
        >
            <Heading
                fontFamily="Arial"
                fontWeight="500"
                fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
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
                            {capitalize(job.jobTitle)}
                        </Heading>
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
                            >
                                Posted by:
                            </Text>
                            <Center justifyContent="flex-start" gap={3}>
                                <span style={{ fontWeight: '500' }}>
                                    {employer.fullName[0].toUpperCase() +
                                        employer.fullName.slice(1)}
                                </span>
                                <Box
                                    w={['30px', '40px', '40px', '50px', '60px']}
                                    h={['30px', '40px', '40px', '50px', '60px']}
                                    borderRadius="50%"
                                    border="2px solid gray"
                                >
                                    <Image
                                        h="100%"
                                        w="100%"
                                        borderRadius="50%"
                                        src={employer.profilePic}
                                    />
                                </Box>
                            </Center>
                        </Box>

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
                                <AiFillCloseCircle color="red" size={20} />
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
                                    <AiFillCloseCircle color="red" size={20} />
                                </Flex>
                            )}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>

                        <DeleteJobPosting
                            jobs={jobs}
                            setJobs={setJobs}
                            currentPosting={job}
                            closeModal={onClose}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>
    )
}
export default JobPostingModal
