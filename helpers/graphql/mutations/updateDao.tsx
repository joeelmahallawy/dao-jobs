import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import { supabase } from '../../../lib/supabase'
import { Dao } from '../../../utils/types'
import getUserId from '../../getUserID'

const updateCurrentDao = async (
    currentDao: Dao,
    setRequestIsSending: Function,
    toast: any,
    user: any,
    dp: any,
) => {
    const updateDao = gql`
        mutation updateDao($daoData: UpdateDao!) {
            updateDaoData(daoData: $daoData) {
                id
            }
        }
    `

    const updateDaoVariables = {
        daoData: {
            discordPopulation: +currentDao.discordPopulation,
            daoGoals: currentDao.daoGoals,
            briefDescription: currentDao.briefDescription,
            id: Number(currentDao.id),
        },
    }

    return await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        updateDao,
        updateDaoVariables,
    )
        .then(async (val) => {
            setRequestIsSending(false)
            return toast({
                containerStyle: {
                    fontFamily: 'Arial',
                },
                title: 'Changes saved.',
                description: "We've saved your changes for you!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((err) => {
            console.error(err.message)
        })
}

export default updateCurrentDao
