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
const SingleUser = gql`
  type SingleUser{
    status:Int!
    message:String!
    data:User
    jwt:String!
  }

`

const UsersResponse = gql`
  type UsersResponse {
    status:Int!
    message:String!
    data:[User]!
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

const BooksResponse = gql`
  type BooksResponse {
    status:Int!
    message:String!
    data:[BookDetail]!
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

const ReadingHistorysResponse = gql`
  type ReadingHistorysResponse{
    status:Int!
    message:String!
    data:[ReadingHistory]!
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

const UserBorrowRecordsResponse = gql`
  type UserBorrowRecordsResponse{
    status:Int!
    message:String!
    data:[UserBorrowRecord]!
  }
`


const FavoriteBook = gql`
  type FavoriteBook{
    favoriteid:String!
    userid: String!
    bookid: String!
  }
`

const FavoriteBooksResponse = gql`
  type FavoriteBooksResponse {
    status:Int!
    message:String!
    data:[FavoriteBook]!
  }
`

module.exports = {
  User,
  SingleUser,
  BookDetail,
  UserBorrowRecord,
  ReadingHistory,
  FavoriteBook,
  UsersResponse,
  BooksResponse,
  ReadingHistorysResponse,
  UserBorrowRecordsResponse,
  FavoriteBooksResponse
}