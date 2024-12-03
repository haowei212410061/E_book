

const UserResolvers = {
    Mutation:{
        createUser:async (parent,{userid,username,password,email,wallet},{db})=>{
            try{
                let res = await db.query('INSERT INTO "Users" (userid,username,password,email,wallet) VALUES ($1,$2,$3,$4,$5) RETURNING *',[userid,username,password,email,wallet])
                return res.rows[0]
            }catch(error){
                console.log("Fail to create user:",error)
            }
        },
        updateUser: async(parent,{userid,username,password,email,wallet},{db})=>{
            try{
                let res = await db.query('UPDATE "Users" SET username = $1, email = $2, wallet = $4 WHERE id = $3 RETURNING *',[userid,username,password,email,wallet])
                return res.rows[0]

            }catch(error){
                console.log("error:",error)
            }
        },
        deleteUser:async(parent,{userid},{db})=>{
            try{
                let res = await db.query('DELETE FROM "Users" WHERE userid = $1 RETURNING *',[userid])
                return res.rows[0]

            }catch(error){
                console.log("error:",error)
            }
        },
        createReadingHistory:async(parent,{historyid,bookid,userid,readdate},{db})=>{
            try{
                let res = await db.query('INSERT INTO "Readinghistory" (historyid,bookid,userid,readdate) VALUES ($1,$2,$3,$4)',[historyid,bookid,userid,readdate])
                return res.rows[0]
            }catch(error){
                console.log("Fail to add new reading history",error)
            }
        },
        updateReadingHistory:async(parent,{historyid,bookid,userid,readdate},{db})=>{
            try{
                let res = await db.query('UPDATE "Readinghistory" SET username = $1, email = $2, wallet = $4 WHERE id = $3 RETURNING *',[historyid,bookid,userid,readdate])
                return res.rows[0]
            }catch(error){
                console.log(error)
            }
        },
        deleteReadingHistory:async(parent,{historyid},{db})=>{
            try{
                let res = await db.query('DELETE FROM "Readinghistory" WHERE id = $1 RETURNING *',[historyid])
                return res.rows[0]

            }catch(error){
                console.log(error)
            }
        },
        createUserBorrowRecord:async(parent,{userid,borrowid,bookid,borrowdate},{db})=>{
            try{
                let res = await db.query('INSERT INTO "BorrowRecord" (userid,borrowid,bookid,borrowdate) VALUES ($1,$2,$3,$4) RETURNING *',[userid,borrowid,bookid,borrowdate])
                return res.rows[0]
            }catch(error){
                console.log(error)
            }
        },
        createUserFavoriteBook:async(parent,{favoriteid,userid,bookid},{db})=>{
            try{
                let res = await db.query('INSERT INTO "UserFavoriteBook" (favoriteid,userid,bookid) VALUES ($1,$2) RETURNING *',[favoriteid,userid,bookid])
                return res.rows
            }catch{
                console.log('create data fail:',error)
            }
        },
        DeleteUserFavoriteBook:async(parent,{favoriteid},{db})=>{
            try{
                let res = await db.query('INSERT INTO "UserFavoriteBook" (favoriteid,userid,bookid) VALUES ($1,$2) RETURNING *',[favoriteid])
                return res
            }catch(error){
                console.log(error)
            }
        }
         
    }
}

module.exports = UserResolvers