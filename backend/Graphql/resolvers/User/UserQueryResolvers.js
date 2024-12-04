const UserQueryResolvers = {
         Query: {
                  ReadingHistorys: async (parent, args, { db }) => {
                           try {
                                    let res = await db.query('SELECT * FROM "Readinghistory"')
                                    console.log(res)
                                    return res.rows
                           } catch (error) {
                                    console.log('fail to query all readinghistorys:', error)
                           }
                  },
                  FavoriteBooks: async (parent, args, { db }) => {
                           try {
                                    let res = await db.query('SELECT * FROM "UserFavoriteBook"')
                                    console.log(res)
                                    return res.rows
                           } catch (error) {
                                    console.log('fail to query all FavoriteBooks:', error)
                           }
                  },
         }
}

module.exports = UserQueryResolvers