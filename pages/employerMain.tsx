import { Heading } from '@chakra-ui/react'
import React from 'react'
import { supabase } from '../lib/supabase'
import EmployerMainPage from '../components/employerMainpage'
import { Dao } from '../utils/types'
import getDaoByUserID from '../helpers/graphql/queries/getDaoByUserID'

const EmployerPage = ({
    user,
    userDao: { Dao, daoServerImageURL },
}: {
    user: any
    userDao: { Dao: Dao; daoServerImageURL: string }
}) => {
    return user && Dao ? (
        <EmployerMainPage
            Dao={Dao}
            user={user}
            daoServerImageURL={daoServerImageURL}
        />
    ) : (
        <Heading>Your not loggged in</Heading>
    )
}
export const getServerSideProps = async ({ req }) => {
    // get user
    const user = await supabase.auth.api.getUserByCookie(req)

    // if user doesn't exist, redirect
    // TODO:TODO:TODO: find redirect destination
    if (!user.user)
        return {
            props: {},
            redirect: { destination: '/seekerMain' },
        }

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
                    userDao: { ...userDao, daoServerImageURL: publicURL },
                },
            }
        })
        .catch((err) => {
            // if there's an error in getting the dao from our user data, then redirect and register a new dao
            return {
                redirect: {
                    destination: '/registration',
                },
            }
        })
}

export default EmployerPage
