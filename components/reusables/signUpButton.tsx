import { Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import DiscordOauth2 from 'discord-oauth2'

import { createClient } from '@supabase/supabase-js'
import { NextPageContext } from 'next'

const SignUpButton = (props) => {
    const supabase = createClient(
        'https://hhuzrwzphweoxbywzhhv.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDg4NjU4NSwiZXhwIjoxOTU2NDYyNTg1fQ.qoxjgLzOf0kMo4Sa0WSF_RRIMP0BnC2CeQDrgPezxPw',
    )
    // supabase.auth.api
    //     .getUserByCookie()
    // const { user, session, error } = await supabase.auth.signIn({
    //     provider: 'discord',
    // })

    return (
        <>
            <Button
                colorScheme="linkedin"
                onClick={async () => {
                    const { user } = await supabase.auth.signIn({
                        provider: 'discord',
                    })

                    // console.log(user)
                }}
            >
                Sign up!
            </Button>
        </>
    )
    // const router = useRouter()
    // const auth = new DiscordOauth2({
    //     clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
    //     clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
    //     redirectUri: process.env.NEXT_PUBLIC_DISCORD_CLIENT_REDIRECT,
    // })
    // const url = auth.generateAuthUrl({
    //     scope: ['identify'],
    // })

    // return router.pathname == '/registration' ? (
    //     <>
    //         <Heading
    //             fontWeight="500"
    //             fontSize={['0.6rem', '0.9rem', '1.25rem', '1.75rem', '2rem']}
    //         >
    //             <span
    //                 style={{
    //                     color: theme.colors.PrimaryBlue,
    //                     fontWeight: 'bold',
    //                 }}
    //             >
    //                 You
    //             </span>{' '}
    //             are signing up
    //         </Heading>
    //     </>
    // ) : (
    //     <>
    //         <Link href={url}>
    //             <Button
    //                 borderRadius="10"
    //                 fontFamily="Arial"
    //                 _focus={{}}
    //                 size="lg"
    //                 p={['1rem', '1rem', '1.25rem', '1.5rem', '2rem']}
    //                 fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
    //                 colorScheme="linkedin"
    //             >
    //                 Signup / Login
    //             </Button>
    //         </Link>
    //     </>
    // )
}
export const getServerSideProps = async (ctx) => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_KEY,
    )
    const token = ctx.req.cookies['sb:token']
    if (!token) {
        return
    }
    const authRequestResult = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                APIKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
            },
        },
    )
    const user = await supabase.auth.api.getUserByCookie(ctx.req)
    return {
        props: {
            user,
        },
    }
}

export default SignUpButton
