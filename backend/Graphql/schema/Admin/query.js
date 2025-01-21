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
    SingleUser(column: String! info:String!): [User]

    AdminUsers: AdminUserResponse
    SingleAdminUser(column: String! info:String!): AdminUserResponse

    AdminBooks: AdminBookDetailResponse
    BooksWithProductionDate(start:String!,end:String!):AdminBookDetailResponse
  
    BorrowRecords:AdminBorrowRecordsResponse
    SingleBorrowRecord(column: String, info: String): AdminBorrowRecordsResponse
  }
`;

module.exports = {
    UserQueryDefs
};
