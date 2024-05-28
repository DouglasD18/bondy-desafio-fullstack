import gql from 'graphql-tag'

export default gql`
  type Mutation {
    mutationTest(test: Boolean): Boolean
    login(login: user.Login): user.User
  }
  
  type User {
    name: String!
    email: String!
    password: String!
    company: String
  }

  type Login {
    email: String!
    password: String!
  }
`
