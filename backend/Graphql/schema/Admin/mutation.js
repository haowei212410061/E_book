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
    updateAdminUserPassword(adminid: String!, newPassword: String!): AdminUser
    updateAdminUserEmail(adminid: String!, newEmail: String!): AdminUser
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
    
    updateBookStatus(
      bookid: String!
      bookstatus:String!
    ): BookDetail

    updateBookBorrowCount(
      bookid:String!
      borrowcount:Int!
    ):BookDetail
    deleteBook(bookid: String!): BookDetail
  }
`;

module.exports = {
  MutationTypeDefs,
};
