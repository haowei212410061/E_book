const { gql } = require("apollo-server-express");
const {
  User,
  BookDetail,
  ReadingHistory,
  ReadingHistorysResponse,
  UserBorrowRecord,
  UserBorrowRecordsResponse,
  FavoriteBook,
  FavoriteBooksResponse,
  UsersResponse,
} = require("./type");

const MutationTypeDefs = gql`
    ${User}
    ${BookDetail}
    ${ReadingHistory}
    ${ReadingHistorysResponse}
    ${UserBorrowRecord}
    ${UserBorrowRecordsResponse}
    ${FavoriteBook}
    ${FavoriteBooksResponse}
    ${UsersResponse}
    
    type Mutation {
        createUser(userid:String!,username:String!,password:String!,email:String!,wallet:Int!):UsersResponse
        updateUserPassword(userid:String!,newPassword:String!):UsersResponse
        updateUserWallet(userid:String!,wallet:Int!):UsersResponse
        deleteUser(userid:String!):UsersResponse

        createReadingHistory(historyid:String!, bookid:String!,userid:String!, readdate:String!):ReadingHistorysResponse
        deleteReadingHistory(historyid:String!):ReadingHistorysResponse

        createUserBorrowRecord(userid:String!,borrowid:String!,bookid:String!,borrowdate:String!):UserBorrowRecordsResponse
        
        createUserFavoriteBook(favoriteid:String!,userid:String!,bookid:String!):FavoriteBooksResponse
        deleteUserFavoriteBook(favoriteid:String!):FavoriteBooksResponse
    }
    
`
module.exports = { MutationTypeDefs }