const AdminMutationResolvers = {
    Mutation: {
        createAdminUser: async (parent, { adminid, username, password, email }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "AdminUser" (adminid,username,password,email) VALUES ($1,$2,$3,$4) RETURNING *', [adminid, username, password, email])
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }

        },
        updateAdminUser: async (parent, { adminid, username, pasword, email }, { db }) => {
            try {
                let res = await db.query('UPDATE "AdminUser" SET username = $1, email = $2, wallet = $4 WHERE id = $3 RETURNING *', [adminid, username, pasword, email])
                return res.rows[0]

            } catch (error) {
                console.log("error:", error)
            }
        },
        deleteAdminUser: async (parent, { adminid }, { db }) => {
            try {
                let res = await db.qery('DELETE FROM "AdminUser" WHERE id = $1 RETURNING *', [adminid])
                return res.rows[0]
            } catch (error) {
                console.log("error:", error);
            }
        },
        createBook: async (parent, { bookid, bookName, bookAuthor, productionDate, borrowStatus, borrowCount, bookCategory }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "bookdetails" (bookid,bookname,bookauthor,productionDate,borrowstatus,borrowcount,bookCategory) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURING *', [bookid, bookName, bookAuthor, productionDate, borrowStatus, borrowCount, bookCategory])
                return res.rows[0]
            } catch (error) {
                console.log("fail to create book:", error)
            }
        }
    },
    Query: {
        Users: async (parent, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "user"')
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleUser: async (parent, { userid, email }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "user" WHERE userid = $1 OR email = $2', [userid, email])
                return res.rows[0]
            } catch (error) {
                console.log("error: User not found", error)
            }
        },
        AdminUsers: async (parent, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "AdminUser"')
                return res.rows[0]

            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleAdminUser: async (parent, { adminid }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "AdminUser" WHERE adminid = $1', [adminid]);
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        Books: async (parent, args, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "bookdetails"');
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleBook: async (parent, { column, info }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "bookdetails" WHERE $2 = $1', [info, column]);
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        BorrowRecords: async (parent, { userid, bookid }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "borrowrecord"')
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleBorrowRecord: async (parent, { userid, bookid }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "borrowrecord" WHERE userid = $1 OR bookid = $2', [userid, bookid]);
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        }
    }
}

module.exports = AdminMutationResolvers