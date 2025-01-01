const {User,
SingleUser,
BookDetail,
UserBorrowRecord,
ReadingHistory,
FavoriteBook,
UsersResponse,
BooksResponse,
ReadingHistorysResponse,
UserBorrowRecordsResponse,
FavoriteBooksResponse} = require('./type')
const { MutationTypeDefs } = require('./mutation')
const { QueryTypeDefs } = require('./query')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const UserTypeDefs = mergeTypeDefs([MutationTypeDefs, QueryTypeDefs, User,
    SingleUser,
    BookDetail,
    UserBorrowRecord,
    ReadingHistory,
    FavoriteBook,
    UsersResponse,
    BooksResponse,
    ReadingHistorysResponse,
    UserBorrowRecordsResponse,
    FavoriteBooksResponse])
module.exports = { UserTypeDefs }