import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const getDaoByUserID = async (user) => {
    // setup query to get employer's DAO
    const daoQuery = gql`
        query getDao($userID: String!) {
            Dao(employerID: $userID) {
                id
                nameOfDao
                discordServerExists
                discordLink
                discordPopulation
                twitterUrl
                daoGoals
                briefDescription
            }
        }
    `
    const daoQueryVariables = {
        userID: user.user.user_metadata.sub,
    }
    // get employer's DAO
    const userDao = await request(
        'http://localhost:3000/api/graphql',
        daoQuery,
        daoQueryVariables,
    )
    return userDao
}
export default getDaoByUserID
