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
        SingleUser: async (parent, { column,info}, { db }) => {
            try {
                const res = await db.query(`SELECT * FROM "Users" WHERE ${column} = $1`, [info])
                console.log(res)
                return res.rows
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
        SingleAdminUser: async (parent, { column,info }, { db }) => {
            try {
                const res = await db.query(`SELECT * FROM "AdminUser" WHERE ${column} = $1`, [info]);
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

        BooksWithProductionDate:async (parent,{start,end},{db})=>{
            try{
                const res = await db.query('SELECT * FROM "BookDetails" WHERE productiondate BETWEEN $1 AND $2',[start,end])
                return {
                    status:200,
                    message:"query books successfully",
                    data:res.rows
                }
            }catch(error){
                throw new ApolloError('fail to query books with production date')
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
        SingleBorrowRecord: async (parent, { column, info }, { db }) => {
            try {
                const res = await db.query(`SELECT * FROM "BorrowRecord" WHERE ${column} = $1`, [info]);
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