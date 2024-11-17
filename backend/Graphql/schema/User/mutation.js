const { gql } = require("apollo-server-express");
const {
  User,
  Book,
  ReadingHistory,
  UserBorrowRecord,
  FavoriteBook,
} = require("./type");

const MutationTypeDefs = gql`
    ${User}
    ${Book}
    ${ReadingHistory}
    ${UserBorrowRecord}
    ${FavoriteBook}
    
    type Mutation {
        createUser(userid:String!,username:String!,password:String!,email:String!,wallet:Int!):User
        updateUser(userid:String!,username:String!,password:String!,email:String!,wallet:Int!):User
        deleteUser(userid:String!):User

        createBook(bookId: String!,bookName: String!,bookAuthor: String!, productionDate: String!, borrowStatus: String! , borrowCount: Int!):Book
        updateBook(bookId: String!,bookName: String!,bookAuthor: String!, productionDate: String!, borrowStatue: String! , borrowCount: Int!):Book
        deleteBook(bookId: String!):Book

        createReadingHistory(historyId:String!, bookId:String!,userId:String!, readDate:String!):Book
        updateReadingHistory(historyId:String!, bookId:String!,userId:String!, readDate:String!):Book
        deleteReadingHistory(historyId:String!):Book

        createUserBorrowRecord(userId:String!,borrowId:String!,bookId:String!,borrowDate:String!):UserBorrowRecord
        
        createUserFavoriteBook(userId:String!,bookId:String!):FavoriteBook
        DeleteUserFavoriteBook(favoriteId:String!):FavoriteBook
    }
    
`
module.exports = {MutationTypeDefs}