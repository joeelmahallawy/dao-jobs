import { Box, Button, FormControl, Input, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

// import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const IndexPage = (props) => {
    // const [user, setUser] = useState(undefined)
    // useEffect(() => {
    //     ;(async () => {
    //         const supabaseUser = await supabase.auth.user()
    //         if (supabaseUser) setUser(supabaseUser.user_metadata)
    //     })()
    // }, [])
    // console.log('heres the user', user)

    return (
        <>
            <Button
                onClick={async () => {
                    const data = await supabase.auth.session()
                    console.log(data)
                }}
            >
                get user session
            </Button>
            <Button
                onClick={async () => {
                    const data = await supabase.auth.user()
                    console.log(data)
                }}
            >
                get user data
            </Button>
            {/* <Link href="/api/auth/login"> */}
            <Button
                onClick={async () => {
                    await supabase.auth.signIn({
                        provider: 'discord',
                    })
                }}
            >
                Signin
            </Button>
            {/* </Link> */}
            <Button
                colorScheme="linkedin"
                onClick={async () => {
                    await supabase.auth.signOut()
                }}
            >
                Signout
            </Button>
        </>
    )
}
// export const getServerSideProps = withPageAuthRequired()

// export const getServerSideProps = async (ctx) => {
//     const data = await fetch('http://localhost:3000/api/stats', {
//         headers: { Cookie: ctx.req.headers.cookie },
//     })

//     const resData = await data.statusText

//     return {
//         props: {
//             resData,
//         },
//     }
// }

export default IndexPage
