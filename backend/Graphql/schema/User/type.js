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
    userId: String!
    borrowId: String!
    bookId: String!
    borrowDate: String!  
  }
  `


const FavoriteBook = gql`
  type FavoriteBook{
    favoriteId:String!
    userId: String!
    bookId: String!
  }
`

module.exports = {
  User,
  Book,
  UserBorrowRecord,
  ReadingHistory,
  FavoriteBook
}