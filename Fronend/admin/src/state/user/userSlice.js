import { createSlice } from "@reduxjs/toolkit";
import reducer from "../bookdetail/booksSlice";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:[]
    },
    reducers:{
        setUsers(state,action){
            state.user = action.payload
        }
    }
});

export const {setUsers} = userSlice.actions
export default userSlice.reducer