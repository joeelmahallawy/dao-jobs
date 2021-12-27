import { gql } from "apollo-server-micro";
export const typeDefs = gql`
  type Query {
    Users: Person
  }
  type Person {
    id: String!
    firstName: String
  }
  type Mutation {
      addUser: 
  }
`;
