import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const getEmployerForJob = async (job, setEmployer) => {
    const query = gql`
        query getEmployer($daoID: String!) {
            getEmployerForJob(daoId: $daoID) {
                discordUsername
                profilePicURL
            }
        }
    `
    const variables = {
        daoID: job.employerID,
    }
    const data = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        query,
        variables,
    )
        .then((val) => setEmployer({ ...val.getEmployerForJob }))
        .catch((err) => {
            console.error(err.message)
        })
}
export default getEmployerForJob
