import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import JobSeekerMainPage from '../components/seekerMain'
import getDaos from '../helpers/graphql/queries/getAllDaos'
import getJobs from '../helpers/getAllJobs'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'
import { AuthUser } from '../interfaces'

const SeekerHomePage = ({ daos, jobs }) => {
    return <JobSeekerMainPage daos={daos} jobs={jobs} />
}

export const getServerSideProps = async (ctx) => {
    const res = await fetch(`http://localhost:3000/api/stats`, {
        headers: { Cookie: ctx.req.headers.cookie },
    })
    const userData = await res.text()
    if (!userData) {
        // if user isn't logged in, redirect to auth0 login page
        return { redirect: { destination: '/' } }
    } else {
        const user: AuthUser = JSON.parse(userData)
        // confirm that user is employer
        const isJobSeeker: boolean = await userIsJobSeeker(user)
        if (isJobSeeker) {
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
                            destination: '/',
                        },
                    }
                })
        } else
            return {
                redirect: {
                    destination: '/registration',
                },
            }
    }
}

export default SeekerHomePage
