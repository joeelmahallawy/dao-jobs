import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'
import { EmployerAuthUser } from '../../../interfaces'
import getUserId from '../../getUserID'

const addDaoAndEmployer = async (
    user: EmployerAuthUser,
    values,
    setNavigationPage,
    toast,
    setIsLoading,
) => {
    const mutationDao = gql`
        mutation createDao($DAODATA: DaoInput!, $EMPLOYERID: String!) {
            addDao(daoData: $DAODATA, employerID: $EMPLOYERID) {
                twitterUrl
            }
        }
    `

    const mutationEmployer = gql`
        mutation createEmployer($EMPLOYERDATA: EmployerInput!) {
            addEmployer(employerData: $EMPLOYERDATA) {
                discordUsername
            }
        }
    `
    const { discordPopulation, ...rest }: { discordPopulation: string } = values
    const newDiscordPopulation = discordPopulation.replaceAll('-', '')
    const fixedDiscordPopulation = Number(
        newDiscordPopulation.replaceAll('+', ''),
    )

    const daoMutationVariables = {
        EMPLOYERID: getUserId(user),
        DAODATA: {
            ...rest,
            discordPopulation: fixedDiscordPopulation,
            employerName: user.name,
            employerProfilePic: user.picture,
            discordServerPicURL: `https://hhuzrwzphweoxbywzhhv.supabase.in/storage/v1/object/public/dao-images/daos/${getUserId(
                user,
            )}.png`,
        },
    }
    const employerMutationVariables = {
        EMPLOYERDATA: {
            profilePicURL: user.picture,
            discordUsername: user.name,
            id: getUserId(user),
        },
    }

    const addEmployer = await request(
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        mutationEmployer,
        employerMutationVariables,
    )
        .then(async () => {
            const addDao = await request(
                process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
                mutationDao,
                daoMutationVariables,
            )
            if (!addDao) throw new Error('Could not post DAO data')
        })
        .then(() => {
            setNavigationPage(true)
            setIsLoading(false)
            return toast({
                containerStyle: {
                    fontFamily: 'Arial',
                    padding: '1rem',
                },
                title: 'DAO registered.',
                description: 'You have successfully registered your DAO!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((err) => {
            console.error(err.message)
        })
}
export default addDaoAndEmployer
