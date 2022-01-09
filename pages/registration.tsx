import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import { supabase } from '../lib/supabase'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import { Button } from '@chakra-ui/button'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'
import { Center, Heading } from '@chakra-ui/react'
import SignIn from '../helpers/signIn'

const RegistrationPage = ({ user }: { user: object | null }) => {
    const [userData, setUserData] = useState(user ? user : supabase.auth.user())

    useEffect(() => {
        setUserData(supabase.auth.user())
    }, [supabase.auth.user()])

    return userData ? (
        <Registration user={userData} />
    ) : (
        <Center gap={5} w="100vw" h="80vh" flexDir="column">
            <Heading fontFamily="Arial" fontSize="3rem">
                You are not logged in
            </Heading>
            <Button
                // bg="red"
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="md"
                p={['0.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem']}
                fontSize={['0.75rem', '1rem', '1.5rem', '1.75rem', '2rem']}
                // fontSize={['1rem', '1.75rem', '2.25rem', '2.75rem', '3rem']}
                colorScheme="linkedin"
                onClick={SignIn}
            >
                Login here
            </Button>
        </Center>
    )
}

export const getServerSideProps = async ({ req }) => {
    // since cookies aren't added at first login, we'll return a null user and catch it on front end
    // user can also just not be validated at all
    if (!req.cookies['sb:token'])
        return {
            props: {
                user: null,
            },
        }

    const response = await supabase.auth.api
        .getUserByCookie(req)
        .then(async (user) => {
            // check if user is employer
            const isEmployer: boolean = await userIsEmployer(user)

            if (isEmployer)
                // if user is employer, redirect to employer main page
                return {
                    redirect: {
                        destination: '/employerMain',
                    },
                }
            else {
                // if user is job seeker, redirect to job seeker main page
                const isJobSeeker: boolean = await userIsJobSeeker(user)
                if (isJobSeeker)
                    return {
                        redirect: {
                            destination: '/seekerMain',
                        },
                    }

                // if user is neither a job seeker or a employer, then stay on this page and register
                return {
                    props: {
                        user: user.user,
                    },
                }
            }
        })
        .catch((err) => {
            return {
                // redirect: {
                //     destination: process.env.NEXT_PUBLIC_DISCORD_AUTH_LINK,
                // },
                props: {
                    user: null,
                },
            }
        })
    return response
}
export default RegistrationPage
