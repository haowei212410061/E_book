const {User,Book,ReadingHistory,UserBorrowRecord,FavoriteBook} = require('./type')
const {MutationTypeDefs} = require('./mutation')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const UserTypeDefs = mergeTypeDefs([MutationTypeDefs,User,Book,ReadingHistory,UserBorrowRecord,FavoriteBook])
module.exports = {UserTypeDefs}