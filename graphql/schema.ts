import { gql } from 'apollo-server-micro'
export const typeDefs = gql`
    type Query {
        getJobSeeker(userID: String!): JobSeeker
        getEmployer(userID: String!): Employer
        Employer: Employer
        Dao(employerID: String!): Dao
        getJobsForCurrentDao(daoID: String!): [JobPosting]
        getEmployerForJob(daoId: String!): Employer
        getAllDaos: [Dao]
        getAllJobs: [JobPosting]
        getDaoNameByID(daoId: String!): Dao
    }
    type Mutation {
        addJobSeeker(jobSeekerData: JobSeekerInput!): JobSeeker
        addEmployer(employerData: EmployerInput!): Employer
        addDao(daoData: DaoInput!, employerID: String!): Dao
        addJobPosting(jobPostData: JobPostingInput!): JobPosting
        deleteJobPosting(jobID: Int!): JobPosting
        deleteUser(seekerID: String!): JobSeeker
    }
    input DaoInput {
        nameOfDao: String!
        discordServerExists: Boolean!
        discordLink: String!
        discordPopulation: Int!
        discordServerPicURL: String!
        twitterUrl: String!
        daoGoals: String!
        briefDescription: String!
        employerName: String!
        employerProfilePic: String!
    }
    type Dao {
        id: ID!
        employerId: String!
        employerName: String!
        employerProfilePic: String!
        nameOfDao: String!
        discordServerExists: Boolean!
        discordLink: String!
        discordPopulation: Int!
        discordServerPicURL: String!
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
        discordUsername: String!
        profilePicURL: String!
    }

    input JobSeekerInput {
        id: ID!
        discordUsername: String!
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
        employerID: String!
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
        employerID: String!
    }
`
