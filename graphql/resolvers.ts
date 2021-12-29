import prisma from '../lib/prisma'
export const resolvers = {
    Query: {
        Employers: async () =>
            await prisma.employers.create({
                data: {
                    discordTag: 'MoreThanYourAverageJoe',
                    ownsDao: 'Anura',
                    profilePic: '23214123',
                },
            }),
    },
    Mutation: {
        addEmployer: async (_, { input }) =>
            await prisma.employers.create({ data: { ...input } }), // console.log
        addDao: async (_, { daoData }) =>
            await prisma.dAOs.create({ data: { ...daoData } }),
    },
}
