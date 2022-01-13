import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { MdCopyright } from 'react-icons/md'
import { useRouter } from 'next/router'

const Footer = () => {
    const router = useRouter()
    return (
        <Center
            justifyContent="flex-end"
            bg={router.pathname != '/' && '#F1F4FF'}
            p="2.5%"
        >
            <Text
                fontFamily="Arial"
                fontWeight="500"
                color="black"
                fontSize="1.5rem"
            >
                &copy; Copyright 2021
            </Text>
        </Center>
    )
}
export default Footer
