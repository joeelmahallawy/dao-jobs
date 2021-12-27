import { gql } from "apollo-server-micro";
export const typeDefs = gql`
  type Query {
    Employers: Employer
  }
  type Mutation {
    addEmployer: Employer
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
`;
