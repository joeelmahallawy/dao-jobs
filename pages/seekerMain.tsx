import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Daos, Jobs } from '../utils/types'
import JobSeekerMainPage from '../components/seekerMain'
import getDaos from '../helpers/graphql/queries/getAllDaos'
import getJobs from '../helpers/getAllJobs'
import { request } from 'graphql-request'
import { gql } from 'apollo-server-micro'
import { Button, Image } from '@chakra-ui/react'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'

const SeekerHomePage = ({ daos, jobs }) => {
    return <JobSeekerMainPage daos={daos} jobs={jobs} />
}
export const getServerSideProps = async ({ req }) => {
    const user = await supabase.auth.api.getUserByCookie(req)
    // if user doesn't exist, redirect to sign in
    // TODO:
    if (!user.user)
        return {
            redirect: {
                destination: process.env.NEXT_PUBLIC_DISCORD_AUTH_LINK,
            },
        }

    const isJobSeeker: boolean = await userIsJobSeeker(user)
    if (isJobSeeker)
        return Promise.all([getDaos(), getJobs()])
            .then((values) => {
                return {
                    props: {
                        // daos array
                        daos: values[0],
                        //jobs array
                        jobs: values[1],
                    },
                }
            })
            .catch((err) => {
                return {
                    redirect: {
                        // redirect user if there is an error in getting daos and jobs
                        destination: '/registration',
                    },
                }
            })
    else
        return {
            redirect: {
                destination: '/registration',
            },
        }
}

export default SeekerHomePage
