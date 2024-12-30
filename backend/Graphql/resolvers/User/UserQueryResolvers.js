const { ApolloError } = require("apollo-server-express")

const UserQueryResolvers = {
    Query: {
        Books: async (parent, {bookname}, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "BookDetails" WHERE bookname = $1',[bookname])
                console.log(res)
                return {
                    status: 200,
                    message: "Book fetch successfully",
                    data: res.rows
                }
            } catch (error) {
                console.log("error: ",error)
                throw new ApolloError(`fail to fetch books ${error.message0}`)
                
            }
        },
        UserBorrowRecords: async (parent, {userid}, { db }) => {
            try{
                const res = await db.query('SELECT * FROM "BorrowRecord" WHERE userid = $1',[userid])
                return {
                    status:200,
                    message:"fetch UserBorrowRecord successfully",
                    data:res.rows || []
                }
            }catch(error){
                throw new ApolloError(`fail to fetch user borrow record ${error.message0}`)
            }
        },

        ReadingHistorys: async (parent, {userid}, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "Readinghistory" WHERE userid = $1',[userid])
                console.log(res)
                return {
                    status:200,
                    message:"fetch reading historys successfully",
                    data:res.rows || []
                }
            } catch (error) {
                console.log(error)
                throw new ApolloError(`fail to fetch reading history ${error.message0}`)
            }
        },
        FavoriteBooks: async (parent, {userid}, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "UserFavoriteBook" WHERE userid = $1',[userid])
                console.log(res)
                return {
                    status:200,
                    message:"fetch favorite books successfully",
                    data:res.rows || []
                }
            } catch (error) {
                console.log("error: ",error)
                throw new ApolloError(`fail to fetch favorite book ${error.message0}`)     
            }
        },
    }
}

module.exports = UserQueryResolvers