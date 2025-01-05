const { gql } = require("apollo-server-express");
const { User } = require('../User/type')
const { AdminUser,AdminUserLoginResponse,AdminUserResponse, AdminBookDetail,AdminBookDetailResponse, AdminBorrowRecord,AdminBorrowRecordsResponse } = require('./type')

const UserQueryDefs = gql`
  ${User}
  ${AdminUser}
  ${AdminUserLoginResponse}
  ${AdminUserResponse}
  ${AdminBookDetail}
  ${AdminBookDetailResponse}
  ${AdminBorrowRecord}
  ${AdminBorrowRecordsResponse}
  type Query {
    
    Users: [User]
    SingleUser(email: String): User

    AdminUsers: AdminUserResponse
    SingleAdminUser(adminid: String!): AdminUserResponse

    AdminBooks: AdminBookDetailResponse
  
    BorrowRecords:AdminBorrowRecordsResponse
    SingleBorrowRecord(userid: String, bookid: String): AdminBorrowRecordsResponse
  }
`;

module.exports = {
    UserQueryDefs
};
