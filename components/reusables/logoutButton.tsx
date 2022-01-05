import { Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import DiscordOauth2 from 'discord-oauth2'
import { userData } from '../../lib/recoil'
import { useRecoilState, useRecoilValue } from 'recoil'
import { supabase } from '../../lib/supabase'

const LogoutButton = () => {
    const [user, setUser] = useRecoilState(userData)
    const router = useRouter()

    return (
        <Link href={process.env.NEXT_PUBLIC_BASE_URL}>
            <Button
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="lg"
                p={['1rem', '1rem', '1.25rem', '1.5rem', '2rem']}
                fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                colorScheme="linkedin"
                onClick={async () =>
                    await supabase.auth.signOut().then((val) => {
                        router.push('/')
                    })
                }
            >
                Logout
            </Button>
        </Link>
    )
}

export default LogoutButton
