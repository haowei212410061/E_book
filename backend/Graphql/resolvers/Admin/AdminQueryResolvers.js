const AdminQueryResolvers = {
    Query: {
        Users: async (parent,args, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "Users"')
                return res.rows
            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleUser: async (parent, { email, password }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "Users" WHERE email = $1 AND password = $2', [email, password])
                return res.rows[0]
            } catch (error) {
                console.log("error: User not found", error)
            }
        },
        AdminUsers: async (parent, args, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "AdminUser"')
                return res.rows

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
                let res = await db.query('SELECT * FROM "BookDetails"');
                console.log(res.rows)
                return res.rows
            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleBook: async (parent, {column,info }, { db }) => {
            try {
                let res = await db.query(`SELECT * FROM "BookDetails" WHERE ${column} = $1`, [info]);
                console.log(res.rows)
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        },
        BorrowRecords: async (parent, args, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "BorrowRecord"')
                return res.rows
            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleBorrowRecord: async (parent, { userid, bookid }, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "BorrowRecord" WHERE userid = $1 OR bookid = $2', [userid, bookid]);
                return res.rows[0]
            } catch (error) {
                console.log("error:", error)
            }
        }
    }
}

module.exports = AdminQueryResolvers