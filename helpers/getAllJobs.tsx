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
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        jobsQuery,
    )
        .then((val) => val)
        .catch((err) => {
            return { props: { err: err.message } }
        })
    return getAllJobs
}
export default getJobs
