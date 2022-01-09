import { Button, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import Link from 'next/link'

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
        <Link href="/api/auth/login">
            <Button
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="md"
                p={['0.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem']}
                fontSize={['0.75rem', '1rem', '1.5rem', '1.75rem', '2rem']}
                colorScheme="linkedin"
            >
                Signup / Login
            </Button>
        </Link>
    )
}

export default SignUpButton
