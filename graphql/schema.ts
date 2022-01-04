import { gql } from 'apollo-server-micro'
export const typeDefs = gql`
    type Query {
        Employer: Employer
        Dao(employerID: String!): Dao
        getJobsForCurrentDao(daoID: String!): [JobPosting]
        getEmployerForJob(daoId: Int!): Employer
    }
    type Mutation {
        addEmployer(employerData: EmployerInput!): Employer
        addDao(daoData: DaoInput!, employerID: String!): Dao
        addJobPosting(jobPostData: JobPostingInput!): JobPosting
    }
    input DaoInput {
        nameOfDao: String!
        discordServerExists: Boolean!
        discordLink: String!
        discordPopulation: Int!
        twitterUrl: String!
        daoGoals: String!
        briefDescription: String!
        employerName: String!
        employerProfilePic: String!
    }
    type Dao {
        id: ID!
        employerID: String!
        employerName: String!
        employerProfilePic: String!
        nameOfDao: String!
        discordServerExists: Boolean!
        discordLink: String!
        discordPopulation: Int!
        twitterUrl: String!
        daoGoals: String!
        briefDescription: String!
    }
    type Employer {
        id: ID!
        discordUsername: String!
        profilePicURL: String!
    }

    input EmployerInput {
        id: ID!
        discordUsername: String!
        profilePicURL: String!
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

    type JobPosting {
        id: ID!
        daoId: Int
        jobTitle: String!
        jobDescription: String!
        tokenExists: Boolean!
        tokenSymbol: String
        tokenPrice: Float
        tokenAddress: String
        currencyOfCompensation: String!
        approximateSalary: String!
        salaryNegotiable: Boolean!
    }
    input JobPostingInput {
        id: Int
        jobTitle: String!
        jobDescription: String!
        tokenExists: Boolean!
        tokenSymbol: String
        tokenPrice: Float
        tokenAddress: String
        currencyOfCompensation: String!
        approximateSalary: String!
        salaryNegotiable: Boolean!
    }
`
