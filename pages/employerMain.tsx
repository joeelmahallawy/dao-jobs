import { Button, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { supabase } from '../lib/supabase'
import EmployerMainPage from '../components/employerMainpage'
import { Dao } from '../utils/types'
import getDaoByUserID from '../helpers/graphql/queries/getDaoByUserID'
import { useUpdate } from 'react-use'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'

const EmployerPage = ({
    user,
    userDao: { Dao, daoServerImageURL },
}: {
    user: any
    userDao: { Dao: Dao; daoServerImageURL: string }
}) => {
    const updateMe = useUpdate()
    // console.log('hers the error broski', props)
    // return null

    return user && Dao ? (
        <EmployerMainPage
            Dao={Dao}
            user={user}
            daoServerImageURL={daoServerImageURL}
            forceUpdate={updateMe}
        />
    ) : (
        <Center h="80vh">
            <Heading>Your not loggged in or you don't have a dao</Heading>
        </Center>
    )
}
export const getServerSideProps = async ({ req }) => {
    // get user
    const user = await supabase.auth.api.getUserByCookie(req)

    // If user doesn't exist, redirect to registration page to sign up
    if (!user.user)
        return {
            props: {},
            redirect: { destination: '/registration' },
        }
    else {
        const isEmployer: boolean = await userIsEmployer(user)

        if (isEmployer) {
            // get DAO from user data
            return getDaoByUserID(user)
                .then(async (userDao) => {
                    // get dao server image
                    const { publicURL } = await supabase.storage
                        .from('dao-images')
                        .getPublicUrl(`daos/${user.user.user_metadata.sub}.png`)
                    return {
                        props: {
                            user: user.user.user_metadata,
                            userDao: {
                                ...userDao,
                                daoServerImageURL: publicURL,
                            },
                        },
                    }
                })
                .catch((err) => {
                    // if there's an error in getting the dao from our user data, then redirect and register a new dao
                    return {
                        // redirect: {
                        //     destination: '/',
                        // },
                        props: {
                            errorMessage: err.message,
                        },
                    }
                })
        } else {
            return {
                redirect: {
                    destination: '/registration',
                },
            }
        }
    }
}

export default EmployerPage
