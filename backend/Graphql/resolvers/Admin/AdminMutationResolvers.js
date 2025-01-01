const { ApolloError } = require("apollo-server-express")
const jwt = require('jsonwebtoken')
require('dotenv').config();
const ADMIN_SECRET_KEY = process.env.ADMIN_USER_JWT_SECRET
const AdminMutationResolvers = {
    Mutation: {
        AdminUserLogin:async (parent,{email,password},{db})=>{
            try{
                const verifyEmail = await db.query('SELECT * FROM "AdminUser" WHERE email = $1',[email])
                if(verifyEmail.rows.length === 0){
                    throw new Error('email not found or incorrect email please check your email')
                }
                const user = verifyEmail.rows[0]
                if(password !== user.password){
                    throw new Error('incorrect password please check your password')
                }else{
                    const token = jwt.sign({id:user.adminid,email:user.email},ADMIN_SECRET_KEY,{expiresIn:"2h"})
                    return {
                       status:200,
                       message:"login admin successfully",
                       data:user,
                       jwt:token 
                    }
                }
            }catch(error){
                throw new ApolloError(`fail to login ${error}`)
            }
        },
        createAdminUser: async (parent, { adminid, username, password, email }, { db }) => {
            try {
                const verifyEmail = await db.query('SELECT * FROM "AdminUser" WHERE email = $1',[email])
                if(verifyEmail.rows.length === 0){
                    const res = await db.query('INSERT INTO "AdminUser" (adminid,username,password,email) VALUES ($1,$2,$3,$4) RETURNING *', [adminid, username, password, email])
                
                    return {
                        status:200,
                        message:"create admin user successfully",
                        data:res.rows
                    }
                }else{
                    throw new ApolloError('This email is existed')
                }
            } catch (error) {
                throw new ApolloError(`fail to create admin user ${error}`)
            }
        },
        updateAdminUserPassword: async (parent, { adminid, newPassword }, { db }) => {
            try {
                const res = await db.query('UPDATE "AdminUser" SET password = $2 WHERE adminid = $1 RETURNING *', [adminid, newPassword])
                return {
                    status:200,
                    message:"update admin user password successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to update admin user password ${error}`)
            }
        },
        updateAdminUserEmail: async (parent, { adminid, newEmail }, { db }) => {
            try {
                const adminUserEmailVerify = await db.query('SELECT * FROM "AdminUser" WHERE email = $1',[newEmail])
                console.log(adminUserEmailVerify)
                const res = await db.query('UPDATE "AdminUser" SET email = $2 WHERE adminid = $1 RETURNING *', [adminid, newEmail])
                console.log(res)
                return {
                    status:200,
                    message:"update admin user password successfully",
                    data:res.rows
                }

            } catch (error) {
                throw new ApolloError(`fail to update admin user email ${error}`)
            }
        },
        deleteAdminUser: async (parent, { adminid }, { db }) => {
            try {
                const res = await db.query('DELETE FROM "AdminUser" WHERE adminid = $1 RETURNING *', [adminid])
                return {
                    status:200,
                    message:"delete admin user successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to delete admin user ${error}`)
            }
        },
        createBook: async (parent, { bookid, bookname, bookauthor, productiondate, bookstatus, borrowcount, bookcategory, bookimage }, { db }) => {
            try {
                const res = await db.query('INSERT INTO "BookDetails" (bookid, bookname, bookauthor, productiondate, bookstatus, borrowcount, bookcategory,bookimage) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *', [bookid, bookname, bookauthor, productiondate, bookstatus, borrowcount, bookcategory, bookimage])
                return {
                    status:200,
                    message:"create book successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to create book ${error}`)
            }
        },
        updateBookStatus: async (parent, { bookid, bookstatus }, { db }) => {
            try {
                const res = await db.query('UPDATE "BookDetails" SET bookstatus = $2 WHERE bookid = $1 RETURNING *', [bookid, bookstatus])
                return {
                    status:200,
                    message:"update book status successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to update book status ${error}`)
            }
        },
        updateBookBorrowCount: async (parent, { bookid, borrowcount }, { db }) => {
            try {
                const res = await db.query('UPDATE "BookDetails" SET borrowcount = $2 WHERE bookid = $1 RETURNING *', [bookid, borrowcount])
                return {
                    status:200,
                    message:"update book borrowCount successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to update book status ${error}`)
            }
        },
        deleteBook: async (parent, { bookid }, { db }) => {
            try {
                const res = await db.query('DELETE FROM "BookDetails" WHERE bookid = $1 RETURNING *', [bookid])
                return {
                    status:200,
                    message:"delete book successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to delete book ${error}`)
            }
        }
    },
}

module.exports = AdminMutationResolvers