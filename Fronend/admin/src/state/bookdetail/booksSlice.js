//狀態管理
import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name:"books",//slice名稱
    //slice初始化狀態
    initialState:{
        books:[],
        loading:true
    },
    //改變state的function reducer(state,action)
    //action會接收到我們從外部傳入進去的參數
    reducers:{
        fetchAllBook(state,action){
            state.books = action.payload
        }
    },
})
export const {fetchAllBook} = booksSlice.actions
export default booksSlice.reducer