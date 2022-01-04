import React, { useEffect, useState } from 'react'
import Registration from '../components/registration'
import { supabase } from '../lib/supabase'

const RegistrationPage = ({ user }) => {
    const [userData, setUserData] = useState(user.user_metadata)

    useEffect(() => {
        if (!userData) {
            // const newUser=await
            setUserData(supabase.auth.user().user_metadata)
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
                        destination: '/',
                    },
                }
            }

            return {
                props: {
                    user: user.user,
                    fake: true,
                },
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

// export function parseCookies(req) {
//     return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
//   }
