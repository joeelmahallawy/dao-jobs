import { Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import DiscordOauth2 from 'discord-oauth2'

const SignUpButton = () => {
    const router = useRouter()
    const auth = new DiscordOauth2({
        clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
        redirectUri: process.env.NEXT_PUBLIC_DISCORD_CLIENT_REDIRECT,
    })
    const url = auth.generateAuthUrl({
        scope: ['identify'],
    })

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
            <Link href={url}>
                <Button
                    borderRadius="10"
                    fontFamily="Arial"
                    _focus={{}}
                    size="lg"
                    p={['1rem', '1rem', '1.25rem', '1.5rem', '2rem']}
                    fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                    colorScheme="linkedin"
                >
                    Signup / Login
                </Button>
            </Link>
        </>
    )
}

export default SignUpButton
