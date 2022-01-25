import { Box, Center, Heading } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import React, { useEffect, useState } from 'react'
import getDaos from '../../helpers/graphql/queries/getAllDaos'
import { Daos } from '../../utils/types'
import RenderDaos from '../seekerMain/renderDaos'

const DaosWindow = () => {
    const [daos, setDaos] = useState<Daos[]>()

    useEffect(() => {
        const data = getDaos()
        data.then((val: Daos[]) => {
            val.sort((a, b) => {
                return b.discordPopulation - a.discordPopulation
            })
            setDaos([...val])
        })
    }, [])

    return (
        <Center
            bg="#F1F4FF"
            zIndex="overlay"
            p="2%"
            maxH="50vh"
            overflow="scroll"
            flexDir="column"
        >
            <Heading fontFamily="Arial" fontSize="4xl">
                Top DAOs by population
            </Heading>
            <Center
                flexDir="column"
                mt={5}
                border="1px solid black"
                bg="white"
                borderRadius={5}
                w="60%"
                pb="1%"
                maxH="40vh"
                overflow="scroll"
                boxShadow="inset 0px 0px 10px  black"
            >
                {daos ? <RenderDaos daos={daos} /> : <Spinner size="xl" />}
            </Center>
        </Center>
    )
}
export default DaosWindow
