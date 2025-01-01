const { gql } = require("apollo-server-express");
const {
  SingleUser,
  BookDetail,
  ReadingHistory,
  UserBorrowRecord,
  FavoriteBook,
  BooksResponse,
  ReadingHistorysResponse,
  UserBorrowRecordsResponse,
  FavoriteBooksResponse,
} = require("./type");

const QueryTypeDefs = gql`
  ${SingleUser}
  ${BookDetail}
  ${ReadingHistory}
  ${UserBorrowRecord}
  ${FavoriteBook}
  ${BooksResponse}
  ${ReadingHistorysResponse}
  ${UserBorrowRecordsResponse}
  ${FavoriteBooksResponse}

  type Query {
    UserLogin(email:String!,password:String!):SingleUser
    Books(bookname: String!): BooksResponse
    UserBorrowRecords(userid: String!): UserBorrowRecordsResponse
    ReadingHistorys(userid: String!): ReadingHistorysResponse
    FavoriteBooks(userid: String!): FavoriteBooksResponse
  }
`;

module.exports = { QueryTypeDefs };
