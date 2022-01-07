import {
    Text,
    Image,
    Box,
    Center,
    Flex,
    Heading,
    Link,
    Divider,
} from '@chakra-ui/react'
import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import capitalize from '../../../helpers/capitalize'
import { Daos, Jobs } from '../../../utils/types'

const RenderJobs = ({ jobs, dao }: { jobs: Jobs[]; dao?: Daos }) => {
    return (
        <>
            <Divider mb={5} />
            <Heading
                fontFamily="Arial"
                fontSize={['1.5rem', '2rem', '2rem', '2.5rem', '3rem']}
            >
                Jobs
            </Heading>
            {jobs.map((job, i) => {
                return (
                    <Box w="100%" key={i}>
                        <Box w="100%" p={5} fontFamily="Arial">
                            <Center justifyContent="space-between" mb={10}>
                                <Heading
                                    fontFamily="Arial"
                                    fontWeight="extrabold"
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
                                <Link
                                    _focus={{}}
                                    _hover={{}}
                                    isExternal
                                    href={`https://discord.com/users/${job.employerID}`}
                                >
                                    <Center
                                        gap={3}
                                        _hover={{ cursor: 'pointer' }}
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
                                            <span style={{ fontWeight: '600' }}>
                                                {dao &&
                                                    capitalize(
                                                        dao?.employerName,
                                                    )}
                                            </span>
                                        </Text>
                                        <Box
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
                                                src={dao?.employerProfilePic}
                                            />
                                        </Box>
                                    </Center>
                                </Link>
                            </Center>

                            <Box>
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
                                            '1.25rem',
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
                                            '1.25rem',
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
                                            '1.25rem',
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
                                            <AiFillCheckCircle
                                                color="green"
                                                size={20}
                                            />
                                            Yes
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
                                                    '1.25rem',
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
                                                    '1.25rem',
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
                                                    '1.25rem',
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
                                        <AiFillCloseCircle
                                            color="red"
                                            size={20}
                                        />
                                        No
                                    </Flex>
                                )}
                                <Box mt={3}>
                                    <Text
                                        fontSize={[
                                            '0.75rem',
                                            '1rem',
                                            '1.25rem',
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
                                            '1.25rem',
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
                                            <AiFillCheckCircle
                                                color="green"
                                                size={20}
                                            />
                                            Yes
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
                                            <AiFillCloseCircle
                                                color="red"
                                                size={20}
                                            />
                                            No
                                        </Flex>
                                    )}
                                </Box>
                            </Box>
                            <Divider mt={5} />
                        </Box>
                    </Box>
                )
            })}
        </>
    )
}
export default RenderJobs
