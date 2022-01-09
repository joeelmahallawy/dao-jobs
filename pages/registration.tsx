import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import { supabase } from '../lib/supabase'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import { Button } from '@chakra-ui/button'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend'

const RegistrationPage = (
    // { user }: { user: AuthUser }
    props,
) => {
    console.log(props)
    return null
    // return <Registration user={user} />
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
        const user = JSON.parse(userData)
        // check if user is employer
        const isEmployer: boolean = await userIsEmployer(user)

        if (isEmployer) {
            // if user is employer, redirect to employer's main page
            return { redirect: { destination: '/employerMain' } }
        } else {
            // if not employer, check if user is job seeker
            const isJobSeeker: boolean = await userIsJobSeeker(user)
            // if user is job seeker, redirect to job seeker's main page
            if (isJobSeeker) return { redirect: { destination: '/seekerMain' } }
            // otherwise, if user isn't job seeker nor employer, return normal discord auth data and have user register
            else return { props: { user } }
        }
    }
}

export default RegistrationPage
