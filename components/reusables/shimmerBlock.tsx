import { Center, Flex } from '@chakra-ui/react'
import React from 'react'
import {
    ShimmerCircularImage,
    ShimmerBadge,
    ShimmerButton,
} from 'react-shimmer-effects'

const ShimmerBlock = () => {
    return (
        <Flex
            m="auto"
            borderRadius={5}
            fontFamily="Arial"
            w={['100%', '100%', '85%']}
            outline="2px solid #F3F3F3"
            boxShadow="1px 1px 5px gray"
            mt="1.5rem"
            pl={5}
            pr={5}
            justifyContent="space-between"
        >
            <Center pt={5} gap={3} fontSize="2px">
                <ShimmerCircularImage />
                <ShimmerBadge width={120} size="sm" />
            </Center>
            <Center m="auto 0" pt={5}>
                <ShimmerButton size="lg" />
            </Center>
        </Flex>
    )
}
export default ShimmerBlock
