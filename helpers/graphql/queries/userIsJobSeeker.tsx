import { gql } from 'apollo-server-micro'
import request from 'graphql-request'
import getUserId from '../../getUserID'

const userIsJobSeeker = async (user) => {
    const query = gql`
        query getUser($userId: String!) {
            getJobSeeker(userID: $userId) {
                id
            }
        }
    `
    const variables = {
        userId: getUserId(user),
    }
    const data = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        query,
        variables,
    )
        .then(({ getJobSeeker }) => getJobSeeker)
        .catch((err) => {
            return null
        })

    if (data) return true
    else return false
}
export default userIsJobSeeker
