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
      bookid: String!
      bookname: String!
      bookauthor: String!
      productiondate: String!
      bookstatus: String!
      borrowcount: Int!
      bookcategory: String!
      bookimage: String!
    ): BookDetail
    updateBook(
      bookid: String!
      bookname: String!
      bookauthor: String!
      productiondate: String!
      bookstatus: String!
      borrowcount: Int!
      bookcategory: String!
      bookimage: String!
    ): BookDetail
    deleteBook(bookid: String!): BookDetail
  }
`;

module.exports = {
  MutationTypeDefs,
};
