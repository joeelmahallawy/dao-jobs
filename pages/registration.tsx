import request, { gql } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import { supabase } from '../lib/supabase'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import { Button } from '@chakra-ui/button'
import { useRouter } from 'next/router'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'

const RegistrationPage = ({ user }) => {
    const [userData, setUserData] = useState(user?.user_metadata)

    useEffect(() => {
        if (!userData) {
            const initializeUser = async function () {
                const data = await supabase.auth.user()
                console.log('dataa', data)
                if (!data) {
                    await supabase.auth.signIn(
                        { provider: 'discord' },
                        {
                            redirectTo:
                                process.env.NEXT_PUBLIC_BASE_URL +
                                '/registration',
                        },
                    )
                } else setUserData(data.user_metadata)
            }
            initializeUser()
        }
    }, [])

    return <Registration user={userData} />
}

export const getServerSideProps = async ({ req }) => {
    const response = await supabase.auth.api
        .getUserByCookie(req)
        .then(async (user) => {
            if (!user) {
                return {
                    redirect: {
                        destination: process.env.NEXT_PUBLIC_DISCORD_AUTH_LINK,
                    },
                }
            }
            if (user.user) {
                // check if user already exists in DB
                // check type of user
                const isEmployer: boolean = await userIsEmployer(user)
                const isJobSeeker: boolean = await userIsJobSeeker(user)

                if (isEmployer)
                    return {
                        redirect: {
                            destination: '/employerMain',
                        },
                    }
                else if (isJobSeeker) {
                    return {
                        redirect: {
                            destination: '/seekerMain',
                        },
                    }
                } else
                    return {
                        props: {
                            user: user.user,
                        },
                    }
            } else {
                return {
                    // props: {
                    //     user: user.user,
                    // },
                    redirect: {
                        destination: process.env.NEXT_PUBLIC_DISCORD_AUTH_LINK,
                    },
                }
            }
        })
        .catch((err) => {
            return {
                props: {
                    err: err.message,
                },
            }
        })
    return response
}
export default RegistrationPage
