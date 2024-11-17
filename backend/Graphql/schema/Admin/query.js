const {gql} = require('apollo-server-express')
const {User} = require('../User/type')
const {AdminUser,BookDetail,BorrowRecord} = require('./type')

const UserQueryDefs = gql`
    ${User}
    ${AdminUser}
    ${BookDetail}
    ${BorrowRecord}

     type Query{
        Users:[User]
        SingleUser(userid:String,email:String):User

        AdminUsers:[AdminUser]
        SingleAdminUser(adminid:String!):AdminUser

        Books:[BookDetail]
        SingleBook(bookid:String,bookName:String,bookAuthor:String,bookCategory:String):BookDetail

        BorrowRecords:[BorrowRecord]
        SingleBorrowRecord(userid:String,bookId:String):BorrowRecord
} 
`


module.exports = {
    UserQueryDefs,
    AdminUserQueryDefs,
    BookQueryDefs,
    BorrowQueryDefs

}



