import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import getUserId from '../../getUserID'

const addJobPosting = async (
    inputValues,
    dao,
    toast,
    onClose,
    setShowBtn,
    setJobs,
    jobs,
    user,
) => {
    const jobPostingMutation = gql`
        mutation createJobPosting($jobData: JobPostingInput!) {
            addJobPosting(jobPostData: $jobData) {
                id
                employerID
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

    const jobPostingMutationVariables = {
        jobData: { ...inputValues, id: +dao.id, employerID: getUserId(user) },
    }
    return await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        jobPostingMutation,
        jobPostingMutationVariables,
    )
        .then((val) => {
            setShowBtn(false)
            onClose()

            setJobs([...jobs, val.addJobPosting])
            // forceUpdate()
            return toast({
                containerStyle: { fontFamily: 'Arial' },
                title: 'Job added!',
                description: 'Successfully added new job posting.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((err) => {
            console.error(err.message)
        })
}
export default addJobPosting
