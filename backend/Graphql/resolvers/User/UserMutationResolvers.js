

const resolvers = {
    Mutation:{
        createUser:async (parent,{userid,username,password,email,wallet},{db})=>{
            try{
                let res = await db.query('INSERT INTO user (userid,username,password,email,wallet) VALUES ($1,$2,$3,$4) RETURNING *',[userid,username,password,email,wallet]))
                return res.rows[0]
            }catch(error){
                console.log("Fail to create user:",error)
            }
        },
        updateUser: async(parent,{userid,username,password,email,wallet},{db})=>{
            try{
                let res = await db.query('UPDATE user SET username = $1, email = $2, wallet = $4 WHERE id = $3 RETURNING *',[userid,username,password,email,wallet])
                return res.rows[0]

            }catch(error){
                console.log("error:",error)
            }
        },
        deleteUser:async(parent,{userid},{db})=>{
            try{
                let res = await db.query('DELETE FROM user WHERE userid = $1 RETURNING *',[userid])
                return res.rows[0]

            }catch(error){
                console.log("error:",error)
            }
        },
        createReadingHisotry:async(parent,{historyId,bookId,userId,readDate},{db})=>{
            try{
                let res = await db.query('INSERT INTO readingHistory (historyId,bookId,userId,readDate) VALUES ($1,$2,$3,$4)',[historyId,bookId,userId,readDate])
                return res.rows[0]
            }catch(error){
                console.log("Fail to add new reading history",error)
            }
        },
        updateReadingHistory:async(parent,{historyId,bookId,userId,readDate},{db})=>{
            try{
                let res = await db.query('UPDATE readingHistory SET username = $1, email = $2, wallet = $4 WHERE id = $3 RETURNING *',[historyId,bookId,userId,readDate])
                return res.rows[0]
            }catch(error){
                console.log(error)
            }
        },
        deleteReadingHistory:async(parent,{historyId},{db})=>{
            try{
                let res = await db.query('DELETE FROM readingHistory WHERE id = $1 RETURNING *',[historyId])
                return res.rows[0]

            }catch(error){
                console.log(error)
            }
        },
        createUserBorrowRecord:async(parent,{userId,borrowId,bookId,borrowDate},{db})=>{
            try{
                let res = await db.query('INSERT INTO borrowRecord (userId,borrowId,bookId,borrowDate) VALUES ($1,$2,$3,$4) RETURNING *',[userId,borrowId,bookId,borrowDate])
                return res.rows[0]
            }catch(error){
                console.log(error)
            }
        }
         
    }
}