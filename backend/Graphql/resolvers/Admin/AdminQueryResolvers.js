const AdminQueryResolvers = {
    Query: {
        Users: async (parent, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "user"')
                return res.rows
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
        AdminUsers: async (parent, args, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "AdminUser"')
                console.log(res)
                return res.rows

            } catch (error) {
                console.log("error:", error)
            }
        },
        SingleAdminUser: async (parent, args, { adminid }, { db }) => {
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
                return res.rows
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
        BorrowRecords: async (parent, args, { db }) => {
            try {
                let res = await db.query('SELECT * FROM "borrowrecord"')
                return res.rows
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

module.exports = AdminQueryResolvers