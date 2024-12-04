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
        updateAdminUserPassword: async (parent, { adminid, newPassword }, { db }) => {
            try {
                let res = await db.query('UPDATE "AdminUser" SET password = $2 WHERE userid = $1 RETURNING *', [adminid, newPassword])
                return res.rows[0]

            } catch (error) {
                console.log("error:", error)
            }
        },
        updateAdminUserEmail: async (parent, { adminid, newEmail }, { db }) => {
            try {
                let res = await db.query('UPDATE "AdminUser" SET email = $2 WHERE userid = $1 RETURNING *', [adminid, newEmail])
                return res.rows[0]

            } catch (error) {
                console.log("error:", error)
            }
        },
        deleteAdminUser: async (parent, { adminid }, { db }) => {
            try {
                let res = await db.qery('DELETE FROM "AdminUser" WHERE adminid = $1 RETURNING *', [adminid])
                return res.rows[0]
            } catch (error) {
                console.log("error:", error);
            }
        },
        createBook: async (parent, { bookid, bookname, bookauthor, productiondate, borrowstatus, borrowcount, bookcategory, bookimage }, { db }) => {
            try {
                let res = await db.query('INSERT INTO "BookDetails" (bookid, bookname, bookauthor, productiondate, borrowstatus, borrowcount, bookcategory,bookimage) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURING *', [bookid, bookname, bookauthor, productiondate, borrowstatus, borrowcount, bookcategory, bookimage])
                return res.rows[0]
            } catch (error) {
                console.log("fail to create book:", error)
            }
        },
        updateBookStatus: async (parent, { bookid, bookstatus }, { db }) => {
            try {
                let res = await db.query('UPDATE "BookDetails" SET bookstatus = $2 WHERE bookid = $1 RETURNING *', [bookid, bookstatus])
                return res.rows[0]
            } catch (error) {
                console.log('fail to update book status:', error)
            }
        },
        updateBookBorrowCount: async (parent, { bookid, borrowcount }, { db }) => {
            try {
                let res = await db.query('UPDATE "BookDetails" SET borrowcount = $2 WHERE bookid = $1 RETURNING *', [bookid, borrowcount])
                return res.rows[0]
            } catch (error) {
                console.log('fail to update book status:', error)
            }
        },
        deleteBook: async (parent, { bookid }, { db }) => {
            try {
                let res = await db.query('DELETE FROM "BookDetails" WHERE bookid = $1 RETURNING *', [bookid])
            } catch (error) {
                console.log('fail to delete book:', error)
            }
        }

    },
}

module.exports = AdminMutationResolvers