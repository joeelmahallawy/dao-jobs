import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import { JobPostingValues } from '../../../utils/types'

const getEmployerForCurrentJob = async (daoID: string, setEmployer) => {
    const query = gql`
        query getEmployer($daoID: Int!) {
            getEmployerForJob(daoId: $daoID) {
                discordUsername
                profilePicURL
            }
        }
    `
    const variables = {
        daoID: +daoID,
    }
    await request('http://localhost:3000/api/graphql', query, variables)
        .then((val) => setEmployer(val.getEmployerForJob))
        .catch((err) => {
            console.error(err.message)
        })
}
export default getEmployerForCurrentJob
