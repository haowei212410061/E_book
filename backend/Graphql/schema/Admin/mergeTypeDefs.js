const { mergeTypeDefs } = require('@graphql-tools/merge')
const {MutationTypeDefs} = require('./mutation')
const {UserQueryDefs} = require('./query')
const {AdminUser,BookDetail,ReadingHistory,BorrowRecord} = require('./type')

const AdminTypeDefs = mergeTypeDefs([MutationTypeDefs,UserQueryDefs,AdminUser,BookDetail,ReadingHistory,BorrowRecord])

module.exports = {
    AdminTypeDefs
}