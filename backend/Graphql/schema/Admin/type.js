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
    bookId: String!
    bookName: String!
    bookAuthor: String!
    productionDate: String!
    borrowStatus: String!
    borrowCount: Int!
    bookCategory: String!
    bookImage:String!
  } 
`
const ReadingHistory = gql`
  type ReadingHistory{
    historyId: String!
    bookId: String!
    userId: String!
    readDate: String!
  }
`

const BorrowRecord = gql`
  type BorrowRecord{
    userId: String!
    borrowId: String!
    bookId: String!
    borrowDate: String!  
  }
  `



module.exports = {
  BookDetail,
  BorrowRecord,
  ReadingHistory,
  AdminUser
}