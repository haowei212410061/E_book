const { mergeTypeDefs } = require('@graphql-tools/merge')
const {MutationTypeDefs} = require('./mutation')
const {UserQueryDefs} = require('./query')
const {
    AdminUser,
    AdminUserLoginResponse,
    AdminUserResponse,
    AdminBookDetail,
    AdminBookDetailResponse,
    AdminBorrowRecord,
    AdminBorrowRecordsResponse,
    AdminReadingHistory,
    AdminReadingHistoryResponse,
  } = require('./type')

const AdminTypeDefs = mergeTypeDefs([MutationTypeDefs,UserQueryDefs,AdminUser,AdminUserLoginResponse,
    AdminUserResponse,
    AdminBookDetail,
    AdminBookDetailResponse,
    AdminBorrowRecord,
    AdminBorrowRecordsResponse,
    AdminReadingHistory,
    AdminReadingHistoryResponse,])

module.exports = {
    AdminTypeDefs
}