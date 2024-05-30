import gql from 'graphql-tag'

export default gql`
  type User {
    name: String!
    email: String!
    password: String!
    company: String
  }

  input Login {
    email: String!
    password: String!
  }

  type Mutation {
    mutationTest: Boolean
    login(login: Login): User
  }
`
