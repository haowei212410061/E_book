const { gql } = require("apollo-server-express");
const { AdminUser, AdminUserResponse , AdminBookDetail, AdminBookDetailResponse } = require("./type");

const MutationTypeDefs = gql`
  ${AdminUser}
  ${AdminUserResponse}
  ${AdminBookDetail}
  ${AdminBookDetailResponse}

  type Mutation {
    AdminUserLogin(email:String!,password:String!):AdminUserLoginResponse
    createAdminUser(
      adminid: String!
      username: String!
      password: String!
      email: String!
    ): AdminUserResponse
    updateAdminUserPassword(adminid: String!, newPassword: String!): AdminUserResponse
    updateAdminUserEmail(adminid: String!, newEmail: String!): AdminUserResponse
    deleteAdminUser(adminid: String!): AdminUserResponse

    createBook(
      bookid: String!
      bookname: String!
      bookauthor: String!
      productiondate: String!
      bookstatus: String!
      borrowcount: Int!
      bookcategory: String!
      bookimage: String!
    ): AdminBookDetailResponse
    
    updateBookStatus(
      bookid: String!
      bookstatus:String!
    ): AdminBookDetailResponse

    updateBookBorrowCount(
      bookid:String!
      borrowcount:Int!
    ):AdminBookDetailResponse
    deleteBook(bookid: String!): AdminBookDetailResponse

    SingleBook(column:String!,info: String!): AdminBookDetailResponse
  }
`;

module.exports = {
  MutationTypeDefs,
};
