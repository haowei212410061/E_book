const { gql } = require('apollo-server')



const AdminUser = gql`
  type AdminUser {
    adminid: String!
    username: String!
    password: String!
    email: String!
  }
`
const BookDetail = gql`
  type BookDetail{
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
const ReadingHistory = gql`
  type ReadingHistory{
    historyid: String!
    bookid: String!
    userid: String!
    readdate: String!
  }
`

const BorrowRecord = gql`
  type BorrowRecord{
    borrowid: String!
    userid: String!
    bookid: String!
    borrowdate: String!  
  }
  `



module.exports = {
  BookDetail,
  BorrowRecord,
  ReadingHistory,
  AdminUser
}