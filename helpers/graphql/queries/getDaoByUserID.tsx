import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import getUserId from '../../getUserID'

const getDaoByUserID = async (user) => {
    // setup query to get employer's DAO
    const daoQuery = gql`
        query getDao($userID: String!) {
            Dao(employerID: $userID) {
                id
                nameOfDao
                employerName
                employerProfilePic
                discordServerExists
                discordServerPicURL
                discordLink
                discordPopulation
                twitterUrl
                daoGoals
                briefDescription
            }
        }
    `
    const daoQueryVariables = {
        userID: getUserId(user),
    }
    // get employer's DAO
    const userDao = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        daoQuery,
        daoQueryVariables,
    )
    return userDao
}
export default getDaoByUserID
