import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const getJobs = async () => {
    const jobsQuery = gql`
        query {
            getAllJobs {
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
                employerID
            }
        }
    `

    const { getAllJobs } = await request(
        'http://localhost:3000/api/graphql',
        jobsQuery,
    )
        .then((val) => val)
        .catch((err) => {
            return { props: { err: err.message } }
        })
    return getAllJobs
}
export default getJobs
