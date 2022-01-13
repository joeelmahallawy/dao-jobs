import {
    Heading,
    Text,
    Box,
    Center,
    Flex,
    Image,
    Container,
} from '@chakra-ui/react'
import React from 'react'
import { useTheme } from '@chakra-ui/react'
import HomeBackground from '../../../attachments/daojobs-bg.png'

const Description = () => {
    const theme = useTheme()

    return (
        <Center
            p="5%"
            gap="1rem"
            display={['block', 'block', 'block', 'flex', 'flex']}
        >
            <Image
                p={5}
                w={['100%', '100%', '100%', '50%', '45%']}
                src={HomeBackground.src}
            />
            <Box p={5} w={['100%', '100%', '100%', '40%', '40%']}>
                <Heading
                    textAlign={['center', 'center', 'center', 'left', 'left']}
                    mb={3}
                    fontSize={['1.5rem', '1.75rem', '2.25rem', '3rem', '3rem']}
                >
                    <span
                        style={{
                            color: theme.colors.PrimaryBlue,
                            marginRight: 10,
                        }}
                    >
                        Work
                    </span>
                    <span style={{ fontWeight: '400' }}>at a DAO!</span>
                </Heading>
                <Text
                    fontFamily="Arial"
                    fontSize={[
                        '1rem',
                        '1.25rem',
                        '1.25rem',
                        '1.4rem',
                        '1.4rem',
                    ]}
                    fontWeight="hairline"
                >
                    Are you a solidity developer or someone who wants to work in
                    DeFi? Do you enjoy working in a decentralized environment
                    where true democracy takes place? Then you are at the right
                    place!
                    <br />
                    <br />
                    DaoJobz makes it easy for you to find your next job in DeFi
                    and contribute to a decentralized organization. Not only are
                    you able to stay anonymous by logging in with your discord,
                    but also, you can get paid in crypto!
                </Text>
            </Box>
        </Center>
    )
}

export default Description
