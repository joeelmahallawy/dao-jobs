import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

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
        jobData: { ...inputValues, id: +dao.id, employerID: user.sub },
    }
    return await request(
        'http://localhost:3000/api/graphql',
        jobPostingMutation,
        jobPostingMutationVariables,
    )
        .then((val) => {
            setShowBtn(false)
            onClose()
            // console.log('NEWVAL', val.addJobPosting)
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
