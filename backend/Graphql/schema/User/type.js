const { gql } = require('apollo-server-express')

const User = gql`
  type User {
    userid: String!
    username: String!
    password: String!
    email: String!
    wallet: Int!
  }

`




const Book = gql`
  type Book{
    bookId: String!
    bookName: String!
    bookAuthor: String!
    productionDate: String!
    borrowStatus: String!
    borrowCount: Int!
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

const UserBorrowRecord = gql`
  type UserBorrowRecord{
    userid: String!
    borrowid: String!
    bookid: String!
    borrowdate: String!  
  }
  `


const FavoriteBook = gql`
  type FavoriteBook{
    favoriteid:String!
    userid: String!
    bookid: String!
  }
`

module.exports = {
  User,
  Book,
  UserBorrowRecord,
  ReadingHistory,
  FavoriteBook
}