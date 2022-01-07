import { Box, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../../../utils/theme'

const Logo = () => {
    const router = useRouter()
    return (
        <Box w="33%" _hover={{ cursor: 'pointer' }}>
            <Link
                href={
                    // router.pathname == "/registration"
                    //   ? router.pathname
                    // :
                    process.env.NEXT_PUBLIC_BASE_URL
                }
            >
                <Flex>
                    <Heading
                        fontWeight="500"
                        fontSize={[
                            '1rem',
                            '1.75rem',
                            '2.25rem',
                            '2.75rem',
                            '3rem',
                        ]}
                    >
                        Dao
                    </Heading>
                    <Heading
                        fontWeight="800"
                        fontSize={[
                            '1rem',
                            '1.75rem',
                            '2.25rem',
                            '2.75rem',
                            '3rem',
                        ]}
                        fontFamily="Poppins"
                        color={theme.colors.PrimaryBlue}
                    >
                        Jobz
                    </Heading>
                </Flex>
            </Link>
        </Box>
    )
}
export default Logo
