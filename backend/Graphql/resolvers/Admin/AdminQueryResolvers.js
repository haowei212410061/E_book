const { ApolloError } = require("apollo-server-express")
const { json } = require("express")
const AdminQueryResolvers = {
    Query: {
        Users: async (parent,args, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "Users"')
                return res.rows
            } catch (error) {
                throw new ApolloError('fail to query users')
            }
        },
        SingleUser: async (parent, { email}, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "Users" WHERE email = $1', [email])
                console.log(res)
                return res.rows[0]
            } catch (error) {
                throw new ApolloError('fail to query singleusers')
            }
        },
        AdminUsers: async (parent, args, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "AdminUser"')
                return {
                    status:200,
                    message:"query admin users successfully",
                    data:res.rows,
                 }
            } catch (error) {
                throw new ApolloError('fail to query admin users')
            }
        },
        SingleAdminUser: async (parent, { adminid }, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "AdminUser" WHERE adminid = $1', [adminid]);
                return {
                    status:200,
                    message:"query single admin users successfully",
                    data:res.rows,
                 }
            } catch (error) {
                console.log("error:", error)
            }
        },
        AdminBooks: async (parent, args, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "BookDetails"');
                return {
                    status:200,
                    message:"query books successfully",
                    data:res.rows,
                 }
            } catch (error) {
                throw new ApolloError('fail to query books')
            }
        },
        
        BorrowRecords: async (parent, args, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "BorrowRecord"')
                return {
                    status:200,
                    message:"query borrow records successfully",
                    data:res.rows,
                 }
            } catch (error) {
                throw new ApolloError('fail to query books')
            }
        },
        SingleBorrowRecord: async (parent, { userid, bookid }, { db }) => {
            try {
                const res = await db.query('SELECT * FROM "BorrowRecord" WHERE userid = $1 OR bookid = $2', [userid, bookid]);
                return {
                    status:200,
                    message:"query single borrow records successfully",
                    data:res.rows,
                 }
            } catch (error) {
                throw new ApolloError('fail to query single books')
            }
        }
    }
}

module.exports = AdminQueryResolvers