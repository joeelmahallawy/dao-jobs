import prisma from '../lib/prisma'
export const resolvers = {
    Query: {
        getJobSeeker: async (_, { userID }) =>
            await prisma.jobSeeker.findFirst({
                where: {
                    id: userID,
                },
            }),
        getEmployer: async (_, { userID }) =>
            await prisma.employer.findFirst({
                where: {
                    id: userID,
                },
            }),
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
        addJobSeeker: async (_, { jobSeekerData }) =>
            await prisma.jobSeeker.create({
                data: {
                    ...jobSeekerData,
                },
            }),
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
        deleteUser: async (_, { seekerID }) =>
            await prisma.jobSeeker.delete({
                where: {
                    id: seekerID,
                },
            }),
        updateDaoData: async (_, { daoData }) =>
            await prisma.dao.update({
                where: {
                    id: daoData.id,
                },
                data: {
                    briefDescription: daoData.briefDescription,
                    discordPopulation: daoData.discordPopulation,
                    daoGoals: daoData.daoGoals,
                },
            }),
    },
}
