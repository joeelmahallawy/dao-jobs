import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import { supabase } from '../lib/supabase'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import userIsJobSeeker from '../helpers/graphql/queries/userIsJobSeeker'
import { AuthUser } from '../interfaces'
import Layout from '../components/Layout'

const RegistrationPage = ({ user }: { user: AuthUser }) => {
    return (
        <Layout page="/registration">
            <Registration user={user} />
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
        const user = JSON.parse(userData)
        // check if user is employer
        const isEmployer: boolean = await userIsEmployer(user)

        // if user is employer, redirect to employer's main page
        if (isEmployer) return { redirect: { destination: '/employerMain' } }
        // else just return user data and have user register
        else return { props: { user } }
    }
}

export default RegistrationPage
