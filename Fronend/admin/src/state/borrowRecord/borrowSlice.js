import { createSlice } from "@reduxjs/toolkit";

const borrowSlice = createSlice({
    name:"borrow",
    initialState:{
        borrow:[]
    },
    reducers:{
        setBorrowRecord(state,action){
            state.borrow = action.payload
        }
    }

})

export const {setBorrowRecord} = borrowSlice.actions
export default borrowSlice.reducer