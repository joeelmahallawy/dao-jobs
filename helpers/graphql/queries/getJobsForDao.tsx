import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const getJobsForDao = async (Dao) => {
    const query = gql`
        query getJobs($dao: String!) {
            getJobsForCurrentDao(daoID: $dao) {
                id
                employerID
                daoId
                jobTitle
                jobDescription
                tokenExists
                tokenSymbol
                tokenPrice
                tokenAddress
                currencyOfCompensation
                approximateSalary
                salaryNegotiable
            }
        }
    `
    const variables = { dao: Dao.id }
    const { getJobsForCurrentDao } = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        query,
        variables,
    )
        .then((val) => val)
        .catch((err) => {
            console.error(err.message)
        })
    return getJobsForCurrentDao
}
export default getJobsForDao
