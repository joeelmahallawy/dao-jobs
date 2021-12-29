import { Button, Center, Flex, Heading } from '@chakra-ui/react'
import { theme } from '../../utils/theme'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import EmployerForm from './employerForm'

const Registration = ({ user }) => {
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState('')
    const [showForm, setShowForm] = useState(false)

    return (
        <Center p="2.5%" h="80vh" flexDir="column">
            {!showForm ? (
                <Flex p={3} gap="2rem" flexDir="column">
                    <Heading
                        fontWeight="500"
                        fontSize={['1rem', '1.25rem', '1.5rem', '2rem', '3rem']}
                    >
                        <span style={{ color: theme.colors.PrimaryBlue }}>
                            Are
                        </span>{' '}
                        you an employer or a job-seeker?
                    </Heading>

                    <Flex
                        mb="3rem"
                        p={3}
                        gap="1rem"
                        justifyContent="space-around"
                    >
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
                        onClick={() => {
                            if (selectedUser == 'seeker')
                                router.push('/seekerMain')
                            if (selectedUser == 'employer') setShowForm(true)
                        }} // okay so you there? okay so it will return "invalid token" same error as when you enter a invalid token
                        //
                        ml="auto"
                        p={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                        fontSize={[
                            '1rem',
                            '1.25rem',
                            '1.5rem',
                            '1.75rem',
                            '2rem',
                        ]}
                        colorScheme="teal"
                        fontFamily="Arial"
                    >
                        Submit
                    </Button>
                </Flex>
            ) : (
                <EmployerForm user={user} />
            )}
        </Center>
    )
}

export default Registration
