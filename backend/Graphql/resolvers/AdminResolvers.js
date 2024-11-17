

const resolvers = {
    Query:{
        Users:async (parent,{db})=>{
            try{
                let res = await db.query('SELECT * FROM User')
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
        },
        SingleUser:async (parent,{userid,email},{db})=>{
            try{
                let res = await db.query('SELECT * FROM User WHERE userid = $1 OR email = $2',[userid,email])
                return res.rows[0]
            }catch(error){
                console.log("error: User not found",error)
            }
        },
        AdminUsers:async (parent,{db})=>{
            try{
                let res = await db.query('SELECT * FROM adminUser')
                return res.rows[0]

            }catch(error){
                console.log("error:",error)
            }
        },
        SingleAdminUser:async (parent,{adminid},{db})=>{
            try{
                let res = await db.query('SELECT * FROM adminUser WHERE admin = $1',[adminid]);
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
        },
        Books:async (parent,{db})=>{
            try{
                let res = await db.query('SELECT * FROM book');
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
        },
        SingleBook:async (parent,{bookid,bookName,bookAuthor,bookCategory})=>{
            try{
                let res = await db.query('SELECT * FROM book WHERE bookid = $1 OR bookName = $2 OR bookAuthor = $3 OR bookCategory = $4',[bookid,bookName,bookAuthor,bookCategory]);
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
        },
        BorrowRecords:async (parent,{userid,bookid},{db})=>{
            try{
                let res = await db.query('SELECT * FROM borrowRecord')
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
        },
        SingleBorrowRecord:async (parent,{userid,bookid},{db})=>{
            try{
                let res = await db.query('SELECT * FROM borrowRecord WHERE userid = $1 OR bookid = $2',[userid,bookid]);
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
        }

    },

    Mutation:{
        createAdminUser: async(parent,{adminid,username,password,email},{db})=>{
            try{
                let res = await db.query('INSERT INTO adminUser (adminid,username,password,email) VALUES ($1,$2,$3,$4) RETURNING *', [adminid, username, password, email])
                return res.rows[0]
            }catch(error){
                console.log("error:",error)
            }
            
        },
        updateAdminUser: async(parent,{adminid,username,pasword,email},{db})=>{
            try{
                let res = await db.query('UPDATE adminUser SET username = $1, email = $2, wallet = $4 WHERE id = $3 RETURNING *',[adminid,username,pasword, email])
                return res.rows[0]

            }catch(error){
                console.log("error:",error)
            }
        },
        deleterAdminUser: async(parent,{adminid},{db})=>{
            try {
                let res = await db.qery('DELETE FROM adminUser WHERE id = $1 RETURNING *', [adminid])
                return res.rows[0]
            } catch (error) {
                console.log("error:",error);
            }
        },
        createBook:async(parent,{bookid,bookName,bookAuthor,productionDate,borrowStatus,borrowCount,bookCategory},{db})=>{
            try {
                let res = await db.query('INSERT INTO book (bookid,bookName,bookAuthor,productionDate,borrowStatus,borrowCount,bookCategory) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURING *',[bookid,bookName,bookAuthor,productionDate,borrowStatus,borrowCount,bookCategory])
                return res.rows[0]
            } catch (error) {
                console.log("fail to create book:",error)
            }
        }
    }



}