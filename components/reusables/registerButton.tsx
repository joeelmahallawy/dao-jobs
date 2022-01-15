import { Button, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../utils/theme'
import Link from 'next/link'

const RegisterButton = () => {
    return (
        <Link href="/registration">
            <Button
                borderRadius="10"
                fontFamily="Arial"
                _focus={{}}
                size="lg"
                p={['0.75rem', '1rem', '1.25rem', '1.5rem', '1.75rem']}
                fontSize={['0.75rem', '1rem', '1.5rem', '1.75rem', '2rem']}
                colorScheme="teal"
            >
                Register as employer
            </Button>
        </Link>
    )
}

export default RegisterButton
