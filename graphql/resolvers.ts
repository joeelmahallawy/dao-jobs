import prisma from '../lib/prisma'
export const resolvers = {
    Query: {
        Dao: async (_, { employerID }) =>
            await prisma.dao.findFirst({
                where: {
                    employerId: employerID,
                },
            }),
        getJobsForCurrentDao: async (_, { daoID }) =>
            await prisma.jobPosting.findMany({
                where: {
                    daoId: +daoID,
                },
            }),
        getEmployerForJob: async (_, { daoId }) =>
            await prisma.employer.findFirst({
                where: {
                    id: daoId,
                },
            }),
        getAllDaos: async () => await prisma.dao.findMany(),
        getAllJobs: async () => await prisma.jobPosting.findMany(),
        getDaoNameByID: async (_, { daoId }) =>
            await prisma.dao.findFirst({
                where: {
                    id: Number(daoId),
                },
            }),
    },
    Mutation: {
        addEmployer: async (_, { employerData }) =>
            await prisma.employer.create({ data: { ...employerData } }),
        addDao: async (_, { daoData, employerID }) =>
            await prisma.dao.create({
                data: {
                    ...daoData,
                    ownedBy: {
                        connect: {
                            id: employerID,
                        },
                    },
                },
            }),
        addJobPosting: async (_, { jobPostData }) => {
            const { id, ...rest } = jobPostData
            const mutation = await prisma.jobPosting.create({
                data: {
                    ...rest,
                    workFor: {
                        connect: {
                            id,
                        },
                    },
                },
            })
            return mutation
        },
        deleteJobPosting: async (_, { jobID }) =>
            await prisma.jobPosting.delete({
                where: {
                    id: jobID,
                },
            }),
    },
}
