import { Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import DiscordOauth2 from 'discord-oauth2'

import { createClient } from '@supabase/supabase-js'
import { NextPageContext } from 'next'
import { supabase } from '../../lib/supabase'

const SignUpButton = () => {
    const router = useRouter()

    return router.pathname == '/registration' ? (
        <>
            <Heading
                fontWeight="500"
                fontSize={['0.6rem', '0.9rem', '1.25rem', '1.75rem', '2rem']}
            >
                <span
                    style={{
                        color: theme.colors.PrimaryBlue,
                        fontWeight: 'bold',
                    }}
                >
                    You
                </span>{' '}
                are signing up
            </Heading>
        </>
    ) : (
        <>
            <Button
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="lg"
                p={['1rem', '1rem', '1.25rem', '1.5rem', '2rem']}
                fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                colorScheme="linkedin"
                onClick={async () => {
                    await supabase.auth.signIn(
                        {
                            provider: 'discord',
                        },
                        {
                            redirectTo: 'http://localhost:3000/registration',
                        },
                    )
                    // await supabase.auth.signOut()
                    // const data = await supabase.auth.session()
                    // console.log(data)
                }}
            >
                Signup / Login
            </Button>
        </>
    )
}

export default SignUpButton
