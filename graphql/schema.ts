import { gql } from 'apollo-server-micro'
export const typeDefs = gql`
    type Query {
        Employers: Employer
    }
    type Mutation {
        addEmployer(employerData: EmployerInput!): Employer!
        addDao(daoData: DaoInput!): Dao!
    }

    input DaoInput {
        nameOfDao: String!
        discordServerExists: String!
        discordLink: String!
        discordPopulation: String!
        twitterUrl: String!
        daoGoals: String!
        briefDescription: String!
    }

    type Dao {
        id: ID!
        nameOfDao: String!
        discordServerExists: String!
        discordLink: String!
        discordPopulation: String!
        twitterUrl: String!
        daoGoals: String!
        briefDescription: String!
    }

    type Employer {
        id: ID!
        discordUsername: String!
        profilePicURL: String!
        # ownsDao: String!
    }

    input EmployerInput {
        id: ID!
        discordUsername: String!
        profilePicURL: String!
        # ownsDao: String!
    }

    type JobSeeker {
        id: ID!
        discordTag: String!
        profilePicURL: String!
    }

    input JobSeekerInput {
        discordTag: String!
        profilePicURL: String!
    }
`
