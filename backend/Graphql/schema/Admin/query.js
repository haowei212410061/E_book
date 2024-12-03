const { gql } = require("apollo-server-express");
const { User } = require('../User/type')
const { AdminUser, BookDetail, BorrowRecord } = require('./type')

const UserQueryDefs = gql`
  ${User}
  ${AdminUser}
  ${BookDetail}
  ${BorrowRecord}
  type Query {
    Users: [User]
    SingleUser(email: String, password: String): User

    AdminUsers: [AdminUser]
    SingleAdminUser(adminid: String!): AdminUser

    Books: [BookDetail!]!
    SingleBook(column:String!,info: String!): BookDetail

    BorrowRecords: [BorrowRecord]
    SingleBorrowRecord(userid: String, bookid: String): BorrowRecord
  }
`;

module.exports = {
    UserQueryDefs
};
