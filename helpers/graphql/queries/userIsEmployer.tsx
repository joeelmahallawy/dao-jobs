import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const userIsEmployer = async (user) => {
    const query = gql`
        query getUser($userId: String!) {
            getEmployer(userID: $userId) {
                id
            }
        }
    `
    const variables = {
        userId: user.user.user_metadata.sub,
    }
    const data = await request(
        'http://localhost:3000/api/graphql',
        query,
        variables,
    )
        .then(({ getEmployer }) => getEmployer)
        .catch((err) => {
            return {
                props: {
                    user: user.user,
                    data: err.message,
                },
            }
        })

    // if (data) {
    //     return true
    // } else return false
    return data
    // if (data) return true
    // else return false
}

export default userIsEmployer
