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
        updateUserPassword(userid:String!,newPassword:String!):User
        updateUserWallet(userid:String!,wallet:Int!):User
        deleteUser(userid:String!):User

        createReadingHistory(historyid:String!, bookid:String!,userid:String!, readdate:String!):ReadingHistory
        deleteReadingHistory(historyid:String!):ReadingHistory

        createUserBorrowRecord(userid:String!,borrowid:String!,bookid:String!,borrowdate:String!):UserBorrowRecord
        
        createUserFavoriteBook(favoriteid:String!,userid:String!,bookid:String!):FavoriteBook
        deleteUserFavoriteBook(favoriteid:String!):FavoriteBook
    }
    
`
module.exports = { MutationTypeDefs }