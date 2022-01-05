import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import { supabase } from '../../../lib/supabase'

const getDaos = async () => {
    const query = gql`
        query {
            getAllDaos {
                id
                employerId
                employerName
                employerProfilePic
                nameOfDao
                discordServerExists
                discordLink
                discordPopulation
                discordServerPicURL
                twitterUrl
                daoGoals
                briefDescription
            }
        }
    `
    const { getAllDaos } = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        query,
    )
        .then(async (val) => {
            // const serverPic = await supabase.storage
            //     .from('dao-images')
            //     .getPublicUrl(`daos/${val.getAllDaos.employerId}.png`)
            return val
            // return [
            //     { ...val.getAllDaos, discordServerPic: serverPic.publicURL },
            // ]
            // return val.getAllDaos
        })
        .catch((err) => {
            return { props: { err: err.message } }
        })
    return getAllDaos
}
export default getDaos
