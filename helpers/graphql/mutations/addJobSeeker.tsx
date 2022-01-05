import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const addJobSeeker = async (user, discordUserTag, router) => {
    const query = gql`
        mutation addSeeker($userData: JobSeekerInput!) {
            addJobSeeker(jobSeekerData: $userData) {
                id
            }
        }
    `
    const variables = {
        userData: {
            id: user.sub,
            discordUsername: discordUserTag,
            profilePicURL: user.avatar_url,
        },
    }
    const res = await request(
        'http://localhost:3000/api/graphql',
        query,
        variables,
    )
        .then(({ getJobSeeker }) => {
            router.push('/seekerMain')
            return getJobSeeker
        })
        .catch((err) => {
            console.error(err.message)
        })
}
export default addJobSeeker