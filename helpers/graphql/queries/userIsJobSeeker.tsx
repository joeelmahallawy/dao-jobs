import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const userIsJobSeeker = async (user) => {
    const query = gql`
        query getUser($userId: String!) {
            getJobSeeker(userID: $userId) {
                id
            }
        }
    `
    const variables = {
        userId: user.user.user_metadata.sub,
    }
    const data = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        query,
        variables,
    )
        .then(({ getJobSeeker }) => getJobSeeker)
        .catch((err) => {
            return {
                props: {
                    user: user.user,
                    data: err.message,
                },
            }
        })
    if (data) return true
    else return false
}
export default userIsJobSeeker
