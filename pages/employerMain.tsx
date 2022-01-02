import {
    Box,
    Center,
    Flex,
    Heading,
    Image,
    Text,
    Link,
    Button,
} from '@chakra-ui/react'
import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import React from 'react'
import { useRecoilState } from 'recoil'
import { userData } from '../lib/recoil'
import { supabase } from '../lib/supabase'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import { theme } from '../utils/theme'
// import Link from 'next/link'

type Dao = {
    nameOfDao: string
    discordServerExists: string
    discordPopulation: string
    discordLink: string
    twitterUrl: string
    daoGoals: string
    briefDescription: string
}

const EmployerMainPage = ({
    user,
    userDao: { Dao },
}: {
    user: any
    userDao: { Dao: Dao }
}) => {
    console.log('user', user)
    console.log('dao', Dao)

    return user && Dao ? (
        <Center flexDir="column">
            <Center
                // color="white"
                justifyContent="flex-start"
                w={['90%', '80%', '70%', '60%', '50%']}
                // m={10}
                // p={[1, 3, 5, 7, 10]}
                // p={3}
                m={[1, 3, 5, 7, 10]}
                // h="75vh"
                borderRadius={10}
                // bg="gray.700"
                // bg={theme.colors.LightBlue}

                bg="#d6dfe9"
                // bg="gray.300"
                // p="2rem"
                flexDir="column"
            >
                <Box>
                    <Flex
                        // p={[1, 3, 5, 7, 10]}
                        pt={3}
                        pl={[1, 3, 5, 7, 10]}
                        pr={[1, 3, 5, 7, 10]}
                        // bg="red"

                        w="100%"
                        justifyContent="space-between"
                    >
                        {/* <Image /> */}
                        <Center>
                            <Box>IMG</Box>
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
                        <Center flexDir="column" fontFamily="Arial">
                            <Text fontSize="1.5rem">{`${Dao.discordPopulation} discord members`}</Text>
                            <Flex gap="2rem">
                                {/* {Dao} */}
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
                                            // bg="gray.6   00"
                                            fontSize="2rem"
                                            p="1rem"
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
                                            // bg="gray.6   00"
                                            fontSize="2rem"
                                            p="1rem"
                                        >
                                            <FaTwitter />
                                        </Box>
                                    </Link>
                                ) : null}
                            </Flex>
                        </Center>
                    </Flex>
                    <Box p={[1, 3, 5, 7, 10]}>
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
                                '1.25rem',
                                '1.5rem',
                                '1.75rem',
                                '2rem',
                            ]}
                            mt={[1, 3, 5, 7, 10]}
                        >
                            {/* {Dao.briefDescription} */}I like pie so much
                            bro,I like pie so much bro,I like pie so much bro,I
                            like pie so much bro,I like pie so much bro,I like
                            pie so much bro,I like pie so much bro,I like pie so
                            much bro,I like pie so much bro,I like pie so much
                            bro,I like pie so much bro,I like pie so much bro,I
                            like pie so much bro,I like pie so much bro,I like
                            pie so much bro,I like pie so much bro,I like pie so
                            much bro,I like pie so much bro,I like pie so much
                            bro,
                        </Text>
                    </Box>
                    <Box p={[1, 3, 5, 7, 10]}>
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
                                '1.25rem',
                                '1.5rem',
                                '1.75rem',
                                '2rem',
                            ]}
                            mt={[1, 3, 5, 7, 10]}
                        >
                            Our goals are to conquer the world BRO!Our goals are
                            to conquer the world BRO!Our goals are to conquer
                            the world BRO!Our goals are to conquer the world
                            BRO!Our goals are to conquer the world BRO!Our goals
                            are to conquer the world BRO!Our goals are to
                            conquer the world BRO!Our goals are to conquer the
                            world BRO!Our goals are to conquer the world BRO!s
                        </Text>
                    </Box>
                </Box>
            </Center>
            <Center bg="gray.300" justifyContent="space-between" p={10} w="50%">
                <Heading fontFamily="Arial ">Add new position</Heading>
                <Button borderRadius="50%" p="2rem" fontSize="2rem">
                    +
                </Button>
            </Center>
        </Center>
    ) : (
        <Heading>Your not loggged in</Heading>
    )
}
export const getServerSideProps = async ({ req }) => {
    const user = await supabase.auth.api.getUserByCookie(req)
    if (!user.user)
        return {
            props: {},
            redirect: { destination: '/seekerMain' },
        }
    else {
        //if user exists, get their DAO:
        const daoQuery = gql`
            query getDao($userID: String!) {
                Dao(employerID: $userID) {
                    nameOfDao
                    discordServerExists
                    discordLink
                    discordPopulation
                    twitterUrl
                    daoGoals
                    briefDescription
                }
            }
        `

        const daoQueryVariables = {
            userID: user.user.user_metadata.sub,
        }

        const userDao = await request(
            'http://localhost:3000/api/graphql',
            daoQuery,
            daoQueryVariables,
        )
        if (!userDao) {
            return { props: {} }
        } else {
            return { props: { user: user.user.user_metadata, userDao } }
        }
    }
}

export default EmployerMainPage
