import prisma from '../lib/prisma'
import { MongoClient } from 'mongodb'
import {
    GraphQLRequestContext,
    GraphQLSchemaContext,
} from 'apollo-server-types'
import { uptime } from 'process'
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
        addEmployer: async (_, { data }) =>
            await prisma.employers.create({ data }),
        addDao: async (_, { data }) => await prisma.daos.create({ data }),
    },
}

// yeah true haha
