import { Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import DiscordOauth2 from 'discord-oauth2'
import { userData } from '../../lib/recoil'
import { useRecoilState, useRecoilValue } from 'recoil'

const LogoutButton = () => {
    const [user, setUser] = useRecoilState(userData)
    console.log(user)
    return (
        <Link href="http://localhost:3000">
            <Button
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="lg"
                p={['1rem', '1rem', '1.25rem', '1.5rem', '2rem']}
                fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                colorScheme="linkedin"
                onClick={() => {
                    localStorage.removeItem('tokens')
                    setUser(null)
                }}
            >
                Logout
            </Button>
        </Link>
    )
}

export default LogoutButton
