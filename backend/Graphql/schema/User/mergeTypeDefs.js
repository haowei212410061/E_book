const { User, Book, ReadingHistory, UserBorrowRecord, FavoriteBook } = require('./type')
const { MutationTypeDefs } = require('./mutation')
const { QueryTypeDefs } = require('./query')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const UserTypeDefs = mergeTypeDefs([MutationTypeDefs, QueryTypeDefs, User, Book, ReadingHistory, UserBorrowRecord, FavoriteBook])
module.exports = { UserTypeDefs }