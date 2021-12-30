import { Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { useRecoilState } from 'recoil'
import { userData } from '../lib/recoil'
import DiscordOauth2 from 'discord-oauth2'
import ProtectedRoute from '../components/protected-route'

const SeekerHomePage = () => {
    const [user, setUser] = useRecoilState(userData)

    return (
        <ProtectedRoute>
            <Button
                onClick={async () => {
                    //   const query = gql`
                    //     query {
                    //       Employers {
                    //         discordTag
                    //         id
                    //         ownsDao
                    //         profilePic
                    //       }
                    //     }
                    //   `;
                    //   request("http://localhost:3000/api/graphql", query).then(
                    //     ({ Employers }) => console.log(Employers)
                    //   );
                }}
            >
                Click for data
            </Button>
            <Heading>This is the job seekers main paige</Heading>
        </ProtectedRoute>
    )
}

export default SeekerHomePage
