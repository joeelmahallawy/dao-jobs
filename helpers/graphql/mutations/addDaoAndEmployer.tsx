import { gql } from 'apollo-server-micro'
import { request } from 'graphql-request'

const addDaoAndEmployer = async (user, values, setNavigationPage, toast) => {
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
        EMPLOYERID: user.sub,
        DAODATA: {
            ...rest,
            discordPopulation: fixedDiscordPopulation,
            employerName: user.fullDiscordUsername,
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
        'http://localhost:3000/api/graphql',
        mutationEmployer,
        employerMutationVariables,
    )
        .then(async () => {
            const addDao = await request(
                'http://localhost:3000/api/graphql',
                mutationDao,
                daoMutationVariables,
            )
            if (!addDao) throw new Error('Could not post DAO data')
        })
        .then(() => {
            setTimeout(() => {
                setNavigationPage(true)
            }, 2000)
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
