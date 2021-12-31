import prisma from '../lib/prisma'
export const resolvers = {
    Query: {
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
            // await prisma.employer.create({ data: { ...employerData } }),
            await prisma.employer.create({ data: { ...employerData } }),
        addDao: async (_, { daoData }) =>
            await prisma.dao.create({ data: { ...daoData } }),
    },
}
