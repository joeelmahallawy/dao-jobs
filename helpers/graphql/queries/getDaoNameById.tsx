import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const getDaoNameById = async (job, setDaoName, setServerPic, setDaoLink) => {
    const query = gql`
        query getDaoName($daoID: String!) {
            getDaoNameByID(daoId: $daoID) {
                nameOfDao
                discordServerPicURL
                discordLink
            }
        }
    `
    const variables = {
        daoID: job.daoId.toString(),
    }
    const data = await request(
        'http://localhost:3000/api/graphql',
        query,
        variables,
    )
        .then((val) => {
            setDaoName(val.getDaoNameByID.nameOfDao)
            setServerPic(val.getDaoNameByID.discordServerPicURL)
            setDaoLink(val.getDaoNameByID.discordLink)
        })
        .catch((err) => {
            console.error(err.message)
        })
}
export default getDaoNameById
