

const UserMutationResolvers = {
    Mutation: {
        createUser: async (parent, { userid, username, password, email, wallet }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "Users" (userid,username,password,email,wallet) VALUES ($1,$2,$3,$4,$5) RETURNING *', [userid, username, password, email, wallet])
                return res.rows[0]
            } catch (error) {
                console.log("Fail to create user:", error)
            }
        },
        updateUserPassword: async (parent, { userid, newPassword }, { db }) => {
            try {
                let res = await db.query('UPDATE "Users" SET password = $2 WHERE userid = $1 RETURNING *', [userid, newPassword])
                console.log(res)
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        updateUserWallet: async (parent, { userid, wallet }, { db }) => {
            try {
                let res = await db.query('UPDATE "Users" SET wallet = $2 WHERE userid = $1 RETURNING *', [userid, wallet])
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },

        deleteUser: async (parent, { userid }, { db }) => {
            try {
                let res = await db.query('DELETE FROM "Users" WHERE userid = $1 RETURNING *', [userid])
                return res.rows[0]

            } catch (error) {
                console.log("error:", error)
            }
        },
        createReadingHistory: async (parent, { historyid, bookid, userid, readdate }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "Readinghistory" (historyid,bookid,userid,readdate) VALUES ($1,$2,$3,$4) RETURNING *', [historyid, bookid, userid, readdate])
                console.log(res)
                return res.rows[0]
            } catch (error) {
                console.log("Fail to add new reading history", error)
            }
        },
        deleteReadingHistory: async (parent, { historyid }, { db }) => {
            try {
                let res = await db.query('DELETE FROM "Readinghistory" WHERE historyid = $1 RETURNING *', [historyid])
                console.log(res)
                return res.rows[0]

            } catch (error) {
                console.log(error)
            }
        },
        createUserBorrowRecord: async (parent, { userid, borrowid, bookid, borrowdate }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "BorrowRecord" (userid,borrowid,bookid,borrowdate) VALUES ($1,$2,$3,$4) RETURNING *', [userid, borrowid, bookid, borrowdate])
                return res.rows[0]
            } catch (error) {
                console.log(error)
            }
        },
        createUserFavoriteBook: async (parent, { favoriteid, userid, bookid }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "UserFavoriteBook" (favoriteid,userid,bookid) VALUES ($1,$2,$3) RETURNING *', [favoriteid, userid, bookid])
                console.log(res)
                return res.rows[0]
            } catch (error) {
                console.log('create data fail:', error)
            }
        },
        deleteUserFavoriteBook: async (parent, { favoriteid }, { db }) => {
            try {
                let res = await db.query('DELETE FROM "UserFavoriteBook" WHERE favoriteid = $1 RETURNING *', [favoriteid])
                return res.rows[0]
            } catch (error) {
                console.log(error)
            }
        }

    }
}

module.exports = UserMutationResolvers