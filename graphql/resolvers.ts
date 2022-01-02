import prisma from '../lib/prisma'
export const resolvers = {
    Query: {
        Dao: async (_, { employerID }) =>
            await prisma.dao.findFirst({
                where: {
                    employerId: employerID,
                },
            }),
        // Employers: async () =>
        //     await prisma.employer.create({
        //         data: {
        //             id
        //             discordTag: 'MoreThanYourAverageJoe',
        //             ownsDao: 'Anura',
        //             profilePic: '23214123',
        //         },
        //     }),
    },
    Mutation: {
        addEmployer: async (_, { employerData }) =>
            await prisma.employer.create({ data: { ...employerData } }),
        addDao: async (_, { daoData, employerID }) =>
            await prisma.dao.create({
                data: {
                    ...daoData,
                    // briefDescription: 'a',
                    // daoGoals: 'a',
                    // discordLink: 'b',
                    // // id: '',
                    // discordPopulation: 'c',
                    // discordServerExists: 's',
                    // nameOfDao: 'd',
                    // twitterUrl: 'f',
                    // id: 'ohya',
                    // employerId: '12',
                    ownedBy: {
                        connect: {
                            id: employerID,
                        },

                        // create: {
                        //     discordUsername: '',
                        //     profilePicURL: '',
                        //     id: '12312321312312',
                        // },
                    },

                    // briefDescription:''
                    // ...daoData,
                    // ownedBy: {
                    //     connect: {
                    //         id: employerID,
                    //     },
                    // },
                },
            }),
    },
}
