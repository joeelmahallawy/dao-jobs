import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const addJobPosting = async (inputValues, dao, toast, onClose, setShowBtn) => {
    const jobPostingMutation = gql`
        mutation createJobPosting($jobData: JobPostingInput!) {
            addJobPosting(jobPostData: $jobData) {
                id
            }
        }
    `
    const jobPostingMutationVariables = {
        jobData: { ...inputValues, id: +dao.id },
    }
    return await request(
        'http://localhost:3000/api/graphql',
        jobPostingMutation,
        jobPostingMutationVariables,
    )
        .then((val) => {
            setShowBtn(false)
            onClose()
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
