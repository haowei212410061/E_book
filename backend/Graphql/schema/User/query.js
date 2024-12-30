const { gql } = require("apollo-server-express");
const {
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
  ${BookDetail}
  ${ReadingHistory}
  ${UserBorrowRecord}
  ${FavoriteBook}
  ${BooksResponse}
  ${ReadingHistorysResponse}
  ${UserBorrowRecordsResponse}
  ${FavoriteBooksResponse}

  type Query {
    Books(bookname: String!): BooksResponse
    UserBorrowRecords(userid: String!): UserBorrowRecordsResponse
    ReadingHistorys(userid: String!): ReadingHistorysResponse
    FavoriteBooks(userid: String!): FavoriteBooksResponse
  }
`;

module.exports = { QueryTypeDefs };
