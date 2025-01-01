const { ApolloError } = require("apollo-server-express")
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.USER_JWT_SECRET
const UserQueryResolvers = {
    Query: {
        UserLogin: async(parent,{email,password},{db})=>{
            try{
                const res = await db.query('SELECT * FROM "Users" WHERE email = $1',[email])
                if(res.rows.length === 0){
                    throw new Error('User not found or incorrect eamil','UNAUTHORIZED')
                }
                const user = res.rows[0]
                if(user.password === password){
                    //驗證成功時 自動生成token
                    const Token = jwt.sign({id:user.id,email:user.email},JWT_SECRET_KEY,{expiresIn:"1h"})
                    return {
                        status:200,
                        message:"login successfully",
                        data:user,
                        jwt:Token
                    }
                }else{
                    throw new Error('User password invalid please check your password')
                }
            }catch(error){
                throw new ApolloError(`fail to login ${error}`)
            }
        },

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