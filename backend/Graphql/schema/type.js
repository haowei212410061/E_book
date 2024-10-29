const { gql } = require('apollo-server-express')

const user = gql`
  type User {
    id: String!
    username: String!
    password: String!
    email: String!
  }

  type reading_history {
    id: String!
    book_id: String!
  }
`
