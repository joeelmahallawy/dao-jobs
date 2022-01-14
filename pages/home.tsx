import React from 'react'
import RenderJobs from '../components/seekerMain/renderJobs'
import getAllJobs from '../helpers/getAllJobs'

const HomePage = ({ jobs }) => {
    return <RenderJobs jobs={jobs} />
}
export const getServerSideProps = async (ctx) => {
    try {
        const jobs = await getAllJobs()
        return { props: { jobs } }
    } catch (error) {
        return { props: { jobs: null } }
    }
}
export default HomePage

// TODO: COMEBACK TO AND FINISH HOMEPAGE THATS UNIVERSAL TO ALL TYPES OF USERS TODO:
