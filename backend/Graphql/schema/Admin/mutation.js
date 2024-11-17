const { gql } = require("apollo-server-express");
const { AdminUserUser, BookDetail } = require("./type");

const MutationTypeDefs = gql`
  ${AdminUserUser}
  ${BookDetail}

  type Mutation {
    createAdminUser(
      adminid: String!
      username: String!
      password: String!
      email: String!
    ): AdminUserUser
    updateAdminUser(
      adminid: String!
      username: String!
      password: String!
      email: String!
    ): AdminUserUser
    deleteAdminUser(adminid: String!): AdminUserUser

    createBook(
      bookId: String!
      bookName: String!
      bookAuthor: String!
      productionDate: String!
      borrowStatus: String!
      borrowCount: Int!
      bookCategory: String!
    ): BookDetail
    updateBook(
      bookId: String!
      bookName: String!
      bookAuthor: String!
      productionDate: String!
      borrowStatue: String!
      borrowCount: Int!
      bookCategory: String!
    ): BookDetail
    deleteBook(bookId: String!): BookDetail
  }


`;

module.exports = {
  MutationTypeDefs,
};
