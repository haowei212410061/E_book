const { ApolloError } = require("apollo-server-express")


const UserMutationResolvers = {
    Mutation: {
        createUser: async (parent, { userid, username, password, email, wallet }, { db }) => {
            try {
                const verifyEmail = await db.query('SELECT * FROM "Users" WHERE email = $1',[email])
                console.log(verifyEmail.rows)
                
                const res = await db.query('INSERT INTO "Users" (userid,username,password,email,wallet) VALUES ($1,$2,$3,$4,$5) RETURNING *', [userid, username, password, email, wallet])
                console.log(res)
                return {
                    status:200,
                    message:"create user successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`Fail to create user ${error}`)
            }
        },
        updateUserPassword: async (parent, { userid, newPassword }, { db }) => {
            try {
                const res = await db.query('UPDATE "Users" SET password = $2 WHERE userid = $1 RETURNING *', [userid, newPassword])
                return {
                    status:200,
                    message:"update user successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`Fail to update user password ${error}`)
            }
        },
        updateUserWallet: async (parent, { userid, wallet }, { db }) => {
            try {
                const res = await db.query('UPDATE "Users" SET wallet = $2 WHERE userid = $1 RETURNING *', [userid, wallet])
                return {
                    status:200,
                    message:"update user wallet successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to update user wallet ${error}`)
            }
        },

        deleteUser: async (parent, { userid }, { db }) => {
            try {
                const res = await db.query('DELETE FROM "Users" WHERE userid = $1 RETURNING *', [userid])
                return{
                    status:200,
                    message:"delete user successfully",
                    data:res.rows
                } 
            } catch (error) {
                throw new ApolloError(`fail to delete user ${error}`)
            }
        },
        createReadingHistory: async (parent, { historyid, bookid, userid, readdate }, { db }) => {
            try {
                const res = await db.query('INSERT INTO "Readinghistory" (historyid,bookid,userid,readdate) VALUES ($1,$2,$3,$4) RETURNING *', [historyid, bookid, userid, readdate])
                return{
                    status:200,
                    message:"create reading hisotry successfully",
                    data:res.rows
                } 
            } catch (error) {
                throw new ApolloError(`fail to create reading history ${error}`)
            }
        },
        deleteReadingHistory: async (parent, { historyid }, { db }) => {
            try {
                const res = await db.query('DELETE FROM "Readinghistory" WHERE historyid = $1 RETURNING *', [historyid])
                return{
                    status:200,
                    message:"delete reading hisotry successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to delete reading history ${error}`)
            }
        },
        createUserBorrowRecord: async (parent, { userid, borrowid, bookid, borrowdate }, { db }) => {
            try {
                const res = await db.query('INSERT INTO "BorrowRecord" (userid,borrowid,bookid,borrowdate) VALUES ($1,$2,$3,$4) RETURNING *', [userid, borrowid, bookid, borrowdate])
                return{
                    status:200,
                    message:"create user borrow record successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to delete reading history ${error}`)
            }
        },
        createUserFavoriteBook: async (parent, { favoriteid, userid, bookid }, { db }) => {
            try {
                const res = await db.query('INSERT INTO "UserFavoriteBook" (favoriteid,userid,bookid) VALUES ($1,$2,$3) RETURNING *', [favoriteid, userid, bookid])
                return{
                    status:200,
                    message:"create user favorite book successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to create favorite book ${error}`)
            }
        },
        deleteUserFavoriteBook: async (parent, { favoriteid }, { db }) => {
            try {
                const res = await db.query('DELETE FROM "UserFavoriteBook" WHERE favoriteid = $1 RETURNING *', [favoriteid])
                return{
                    status:200,
                    message:"delete user favorite book successfully",
                    data:res.rows
                }
            } catch (error) {
                throw new ApolloError(`fail to create favorite book ${error}`)
            }
        }

    }
}

module.exports = UserMutationResolvers