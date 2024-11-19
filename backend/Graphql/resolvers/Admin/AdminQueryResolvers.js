
const AdminQueryResolvers = {
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
}

module.exports = {AdminQueryResolvers}