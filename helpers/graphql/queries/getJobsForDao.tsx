import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const getJobsForDao = async (Dao) => {
    const query = gql`
        query getJobs($dao: String!) {
            getJobsForCurrentDao(daoID: $dao) {
                id
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
        'http://localhost:3000/api/graphql',
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
