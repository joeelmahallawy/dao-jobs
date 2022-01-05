import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const getDaos = async () => {
    const query = gql`
        query {
            getAllDaos {
                employerId
                employerName
                employerProfilePic
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
    const { getAllDaos } = await request(
        'http://localhost:3000/api/graphql',
        query,
    )
        .then((val) => val)
        .catch((err) => {
            return { props: { err: err.message } }
        })
    return getAllDaos
}
export default getDaos
