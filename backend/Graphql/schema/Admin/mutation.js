const { gql } = require("apollo-server-express");
const { AdminUser, BookDetail } = require("./type");

const MutationTypeDefs = gql`
  ${AdminUser}
  ${BookDetail}

  type Mutation {
    createAdminUser(
      adminid: String!
      username: String!
      password: String!
      email: String!
    ): AdminUser
    updateAdminUser(
      adminid: String!
      username: String!
      password: String!
      email: String!
    ): AdminUser
    deleteAdminUser(adminid: String!): AdminUser

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
