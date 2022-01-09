import { gql } from 'apollo-server-micro'
import request from 'graphql-request'
import { AuthUser } from '../../../interfaces'
import getUserId from '../../getUserID'

const addJobSeeker = async (
    user: AuthUser,
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
            id: getUserId(user),
            discordUsername: discordUserTag,
            profilePicURL: user.picture,
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
