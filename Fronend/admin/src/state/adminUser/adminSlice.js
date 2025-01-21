import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
    name:"adminUser",
    initialState:{
        adminUser:[]
    },
    reducers:{
        setAdminUser(state,action){
            state.adminUser = action.payload
        }
    }

})

export const {setAdminUser} = adminUserSlice.actions
export default adminUserSlice.reducer