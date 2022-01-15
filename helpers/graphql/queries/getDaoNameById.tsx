import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const getDaoNameById = async (
    job,
    setDaoName,
    setServerPic,
    setDaoLink,
    setEmployer,
) => {
    const query = gql`
        query getDaoName($daoID: String!) {
            getDaoNameByID(daoId: $daoID) {
                nameOfDao
                discordServerPicURL
                discordLink
                employerName
                employerProfilePic
            }
        }
    `
    const variables = {
        daoID: job.daoId.toString(),
    }
    const data = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        query,
        variables,
    )
        .then(({ getDaoNameByID }) => {
            setEmployer({
                discordUsername: getDaoNameByID.employerName,
                profilePicURL: getDaoNameByID.employerProfilePic,
            })

            setDaoName(getDaoNameByID.nameOfDao)
            setServerPic(getDaoNameByID.discordServerPicURL)
            setDaoLink(getDaoNameByID.discordLink)
        })
        .catch((err) => {
            console.error(err.message)
        })
    return data
}
export default getDaoNameById
