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
    historyId: String!
    bookId: String!
    userId: String!
    readDate: String!
  }
`

const UserBorrowRecord=gql`
  type UserBorrowRecord{
    userid: String!
    borrowid: String!
    bookid: String!
    borrowdate: String!  
  }
  `


const FavoriteBook = gql`
  type FavoriteBook{
    favoritid:String!
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