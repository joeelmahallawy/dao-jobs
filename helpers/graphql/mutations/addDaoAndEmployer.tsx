import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const addDaoAndEmployer = async (
    user,
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
    // https://hhuzrwzphweoxbywzhhv.supabase.co/storage/v1/object/public/dao-images/daos/646417780576616458.png

    const daoMutationVariables = {
        EMPLOYERID: user.sub,
        DAODATA: {
            ...rest,
            discordPopulation: fixedDiscordPopulation,
            employerName: user.fullDiscordUsername,
            employerProfilePic: user.avatar_url,
            discordServerPicURL: `https://hhuzrwzphweoxbywzhhv.supabase.co/storage/v1/object/public/dao-images/daos/${user.sub}.png`,
        },
    }
    const employerMutationVariables = {
        EMPLOYERDATA: {
            profilePicURL: user.avatar_url,
            discordUsername: user.full_name,
            id: user.sub,
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
            // alert('There was an error registering your DAO')
        })
}
export default addDaoAndEmployer
