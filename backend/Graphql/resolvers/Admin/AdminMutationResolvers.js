

const AdminMutationresolvers = {
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

module.exports = {
    AdminMutationresolvers
}