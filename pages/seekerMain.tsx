import { Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { request, gql } from 'graphql-request'
import { useRecoilState } from 'recoil'
import { userData } from '../recoil'
import DiscordOauth2 from 'discord-oauth2'

const SeekerHomePage = () => {
    const oauth = new DiscordOauth2()
    const [user, setUser] = useRecoilState(userData)
    useEffect(() => {
        oauth
            .getUser(JSON.parse(localStorage.getItem('tokens')).access_token)
            .then((res) => setUser(res))
    }, [])
    console.log(user)

    return (
        <>
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
        </>
    )
}

export default SeekerHomePage
