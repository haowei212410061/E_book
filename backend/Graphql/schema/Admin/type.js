const { gql } = require('apollo-server')



const AdminUser = gql`
  type AdminUser {
    adminid: String!
    username: String!
    password: String!
    email: String!
  }
`
const AdminUserLoginResponse = gql`
  type AdminUserLoginResponse{
    status:Int!
    message:String!
    data:AdminUser
    jwt:String!
  }
`

const AdminUserResponse = gql`
  type AdminUserResponse{
    status:Int!
    message:String!
    data:[AdminUser]!
  }
`

const AdminBookDetail = gql`
  type AdminBookDetail{
    bookid: String!
    bookname: String!
    bookauthor: String!
    productiondate: String!
    bookstatus: String!
    borrowcount: Int!
    bookcategory: String!
    bookimage:String!
  } 
`
const AdminBookDetailResponse = gql`
  type AdminBookDetailResponse{
    status:Int!
    message:String!
    data:[AdminBookDetail]!
  }
`

const AdminReadingHistory = gql`
  type AdminReadingHistory{
    historyid: String!
    bookid: String!
    userid: String!
    readdate: String!
  }
`

const AdminReadingHistoryResponse = gql`
  type AdminReadingHistoryResponse{
    status:Int!
    message:String!
    data:[AdminReadingHistory]!
  }
`

const AdminBorrowRecord = gql`
  type AdminBorrowRecord{
    borrowid: String!
    userid: String!
    bookid: String!
    borrowdate: String!  
  }
  `

const AdminBorrowRecordsResponse = gql`
  type AdminBorrowRecordsResponse{
    status:Int!
    message:String!
    data:[AdminBorrowRecord]!
  }
`
module.exports = {
  AdminUser,
  AdminUserLoginResponse,
  AdminUserResponse,
  AdminBookDetail,
  AdminBookDetailResponse,
  AdminBorrowRecord,
  AdminBorrowRecordsResponse,
  AdminReadingHistory,
  AdminReadingHistoryResponse,
}