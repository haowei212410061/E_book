import { useDispatch } from "react-redux";
import { GET_ALL_USERS_WITH_ADMIN,GET_SINGLE_USER_WITH_ADMIN } from "../Graphql api/query";
import { client } from "../main";
import { setUsers } from "../state/user/userSlice";
import { useToast } from "./useToast";
export function useUserAPI(){
    const dispatch = useDispatch();
    const {success,warning} = useToast();
    const getAllUsers = async()=>{
        try{
            const {data} = await client.query({
                query:GET_ALL_USERS_WITH_ADMIN
            })
            const res = data.Users
            if(res.length === 0){
                warning("no data")
                return 
            }else{
                dispatch(setUsers(res))
                return res
            }
           
        }catch(error){
            console.log(error)
        }
    }

    const getSingleUser = async(column,info)=>{
        try{
            const {data} = await client.query({
                query:GET_SINGLE_USER_WITH_ADMIN,
                variables:{
                    column:column,
                    info:info
                }                
            })
            const res = data.SingleUser
            if(res.length === 0){
                dispatch(setUsers([]))
                warning("no data")
                return 
            }else{
                dispatch(setUsers(res))
                success(`已搜尋到${res.length}筆資料`)
                return res
            }
        }catch(error){
            console.log(error)
        }
    }
    return {getAllUsers,getSingleUser}
}