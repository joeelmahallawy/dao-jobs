import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const deleteJobPosting = async (jobID, toast) => {
    const mutation = gql`
        mutation deleteJob($jobId: Int!) {
            deleteJobPosting(jobID: $jobId) {
                id
            }
        }
    `

    const variables = {
        jobId: jobID,
    }
    const { deleteJobPosting } = await request(
        'http://localhost:3000/api/graphql',
        mutation,
        variables,
    )
        .then((val) => val)
        .catch((err) => {
            console.error(err.message)
        })
    if (deleteJobPosting)
        return toast({
            containerStyle: {
                fontFamily: 'Arial',
            },
            title: 'Job deleted!',
            description: 'Successfully deleted job posting.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
}

export default deleteJobPosting
