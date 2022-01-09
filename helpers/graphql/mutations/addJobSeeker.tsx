import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const addJobSeeker = async (
    user,
    discordUserTag,
    router,
    setButtonIsLoading,
) => {
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
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
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
