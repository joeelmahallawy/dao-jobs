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
                w={['100%', '100%', '100%', '50%', '50%']}
                src={HomeBackground.src}
            />
            <Box p={5} w={['100%', '100%', '100%', '40%', '40%']}>
                <Heading
                    textAlign={['center', 'center', 'center', 'left', 'left']}
                    mb={3}
                    fontSize={['1.5rem', '1.75rem', '2.5rem', '3.5rem', '4rem']}
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
                    fontSize={['1rem', '1.25rem', '1.5rem', '1.5rem', '1.5rem']}
                    fontWeight="hairline"
                >
                    Are you a solidity developer? Do you enjoy working in DeFi?
                    Then you are at the right place!
                    <br />
                    <br />
                    DaoJobs makes it easy for you to find your great next job in
                    the dao space which has a huge demand as of now and is still
                    growing!
                </Text>
            </Box>
        </Center>
    )
}

export default Description
