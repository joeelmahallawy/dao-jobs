import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react'
import { theme } from '../../utils/theme'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import EmployerForm from './employerForm'
import request from 'graphql-request'
import { gql } from 'apollo-server-micro'
import addJobSeeker from '../../helpers/graphql/mutations/addJobSeeker'

const Registration = ({ user }) => {
    // console.log('heres user from registration/index.tsx pgae', user)
    const [buttonIsLoading, setButtonIsLoading] = useState(false)
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState('')
    const [showForm, setShowForm] = useState(undefined)
    const [discordUserTag, setDiscordUserTag] = useState('')

    if (showForm == undefined) {
        return (
            <Center p="2.5%" h="80vh" flexDir="column">
                <Flex
                    w={['95%', '85%', '70%', '50%', '40%', '30%']}
                    // bg="red"
                    fontFamily="Arial"
                >
                    <Flex w="100%" gap={10} flexDir="column" fontSize="3rem">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                setShowForm(false)
                            }}
                        >
                            <FormControl
                                isRequired
                                display="flex"
                                flexDir="column"
                                gap={5}
                            >
                                <FormLabel fontSize="1.25rem" fontWeight="bold">
                                    Enter full discord username
                                </FormLabel>
                                <Input
                                    variant="filled"
                                    placeholder="e.g. MoreThanYourAverageJoe#3911"
                                    size="lg"
                                    onChange={(e) => {
                                        setDiscordUserTag(e.currentTarget.value)
                                    }}
                                />
                                <Button
                                    type="submit"
                                    colorScheme="telegram"
                                    ml="auto"
                                    fontSize="1.25rem"
                                    p="1rem"
                                >
                                    Next
                                </Button>
                            </FormControl>
                        </form>
                    </Flex>
                </Flex>
            </Center>
        )
    }
    if (showForm == true) {
        return (
            <Center p="2.5%" flexDir="column">
                <EmployerForm
                    user={{ ...user, fullDiscordUsername: discordUserTag }}
                />
            </Center>
        )
    }
    return (
        <Center p="2.5%" h="80vh" flexDir="column">
            <Flex p={3} fontFamily="Arial" gap="2rem" flexDir="column">
                <Heading
                    fontWeight="500"
                    fontSize={['1rem', '1.25rem', '1.5rem', '2rem', '3rem']}
                >
                    <span style={{ color: theme.colors.PrimaryBlue }}>Are</span>{' '}
                    you an employer or a job-seeker?
                </Heading>

                <Flex mb="3rem" p={3} gap="1rem" justifyContent="space-around">
                    <Button
                        onClick={() => setSelectedUser('employer')}
                        p={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                        fontSize={[
                            '1rem',
                            '1.25rem',
                            '1.5rem',
                            '1.75rem',
                            '2rem',
                        ]}
                        colorScheme="linkedin"
                        fontFamily="Arial"
                        _focus={{
                            outline: '5px solid gray',
                        }}
                    >
                        Employer
                    </Button>
                    <Button
                        onClick={() => setSelectedUser('seeker')}
                        p={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                        fontSize={[
                            '1rem',
                            '1.25rem',
                            '1.5rem',
                            '1.75rem',
                            '2rem',
                        ]}
                        colorScheme="green"
                        fontFamily="Arial"
                        _focus={{
                            outline: '5px solid gray',
                        }}
                    >
                        Job seeker
                    </Button>
                </Flex>
                <Button
                    isLoading={buttonIsLoading}
                    onClick={async () => {
                        if (selectedUser == 'seeker') {
                            setButtonIsLoading(true)
                            addJobSeeker(
                                user,
                                discordUserTag,
                                router,
                                setButtonIsLoading,
                            )
                        }
                        if (selectedUser == 'employer') setShowForm(true)
                    }}
                    ml="auto"
                    p={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                    fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                    colorScheme="teal"
                    fontFamily="Arial"
                >
                    Submit
                </Button>
            </Flex>
        </Center>
    )
}

export default Registration
