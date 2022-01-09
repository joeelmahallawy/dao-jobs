import { Button, Heading } from '@chakra-ui/react'
import Link from 'next/link'

import React from 'react'

const LogoutButton = () => {
    return (
        <Link href="/api/auth/logout">
            <Button
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="lg"
                p={['1rem', '1rem', '1.25rem', '1.5rem', '2rem']}
                fontSize={['1rem', '1.25rem', '1.5rem', '1.75rem', '2rem']}
                colorScheme="linkedin"
            >
                Logout
            </Button>
        </Link>
    )
}

export default LogoutButton
