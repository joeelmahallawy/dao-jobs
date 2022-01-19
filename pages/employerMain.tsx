import { Button, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { supabase } from '../lib/supabase'
import EmployerMainPage from '../components/employerMainpage'
import { Dao } from '../utils/types'
import getDaoByUserID from '../helpers/graphql/queries/getDaoByUserID'
import { useUpdate } from 'react-use'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import getUserId from '../helpers/getUserID'
import { AuthUser } from '../interfaces'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'
import Layout from '../components/Layout'

const EmployerPage = ({
    user,
    userDao: { Dao, daoServerImageURL },
}: {
    user: AuthUser
    userDao: { Dao: Dao; daoServerImageURL: string }
}) => {
    // console.log(daoServerImageURL)
    return (
        <Layout page="/employerMain">
            <EmployerMainPage
                Dao={Dao}
                user={user}
                daoServerImageURL={daoServerImageURL}
            />
        </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`, {
        headers: { Cookie: ctx.req.headers.cookie },
    })
    const userData = await res.text()
    if (!userData) {
        // if user isn't logged in, redirect to auth0 login page
        return { redirect: { destination: '/api/auth/login' } }
    } else {
        const user: AuthUser = JSON.parse(userData)

        // confirm that user is employer
        const isEmployer: boolean = await userIsEmployer(user)
        if (isEmployer)
            // if user is employer, get DAO associated with user and return it to front end
            return getDaoByUserID(user)
                .then(async (userDao) => {
                    // get dao server image
                    const { publicURL } = await supabase.storage
                        .from('dao-images')
                        .getPublicUrl(`daos/${getUserId(user)}.png`)
                    return {
                        // return data to client
                        props: {
                            user: user,
                            userDao: {
                                ...userDao,
                                daoServerImageURL: publicURL,
                            },
                        },
                    }
                })
                .catch((err) => {
                    return { redirect: { destination: '/' } }
                })
        else
            return {
                redirect: {
                    destination: '/registration',
                },
            }
    }
}

export default EmployerPage
