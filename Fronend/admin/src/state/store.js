import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./bookdetail/booksSlice";
import borrowSlice from "./borrowRecord/borrowSlice";
import adminUserSlice from './adminUser/adminSlice'
import userSlice from './user/userSlice'
const store = configureStore({
  //改變 or 取得state的function
  reducer: {
    books: booksSlice,
    borrow: borrowSlice,
    adminUser:adminUserSlice,
    user:userSlice
  },
});

export default store;
