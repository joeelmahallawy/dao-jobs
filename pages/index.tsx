import React, { useEffect, useState } from 'react'
import JobSeekerMainPage from '../components/seekerMain'
import getDaos from '../helpers/graphql/queries/getAllDaos'
import getJobs from '../helpers/getAllJobs'
import userIsEmployer from '../helpers/graphql/queries/userIsEmployer'
import Layout from '../components/Layout'
import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'

const IndexPage = ({ daos, jobs }) => {
    return (
        <Layout page="/">
            <JobSeekerMainPage daos={daos} jobs={jobs} />
        </Layout>
    )
}

export const getServerSideProps = async () => {
    // get all jobs and daos
    return Promise.all([getDaos(), getJobs()])
        .then((values) => {
            return {
                props: {
                    // daos array
                    daos: values[0],
                    //jobs array
                    jobs: values[1],
                },
            }
        })
        .catch((err) => {
            return {
                props: { daos: null, jobs: null },
            }
        })
}

export default IndexPage
