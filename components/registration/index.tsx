import {
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import EmployerForm from './employerForm'
import { AuthUser } from '../../interfaces'

const Registration = ({ user }: { user: AuthUser }) => {
    const [showForm, setShowForm] = useState(false)
    const [discordUserTag, setDiscordUserTag] = useState('')

    return showForm ? (
        <Center p="2.5%" flexDir="column">
            <EmployerForm
                user={{ ...user, fullDiscordUsername: discordUserTag }}
            />
        </Center>
    ) : (
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
                            setShowForm(true)
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

export default Registration
