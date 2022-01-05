import { gql } from 'apollo-server-micro'
import request from 'graphql-request'

const getDaoNameById = async (job, setDaoName, setServerPic) => {
    const query = gql`
        query getDaoName($daoID: String!) {
            getDaoNameByID(daoId: $daoID) {
                nameOfDao
                discordServerPicURL
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
        })
        .catch((err) => {
            console.error(err.message)
        })
}
export default getDaoNameById
