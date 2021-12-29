import { gql } from 'apollo-server-micro'
export const typeDefs = gql`
    type Query {
        Employers: Employer
    }
    input Mutation {
        addEmployer(data:Employer): Employer
        addDao(data:Dao): Dao
    }
    type Dao {
        id: ID!
        name: String!
        serverExists: String!
        discordLink: String!
        discordPopulation: String!
        twitterUrl: String!
        goalOfDao: String!
        briefDescription: String!
    }
    type Employer {
        id: ID!
        discordTag: String!
        profilePic: String!
        ownsDao: String!
    }
    type JobSeeker {
        id: ID!
        discordTag: String!
        profilePic: String!
    }
`
