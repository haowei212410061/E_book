import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./bookdetail/booksSlice";
import borrowSlice from "./borrowRecord/borrowSlice";
const store = configureStore({
  //改變 or 取得state的function
  reducer: {
    books: booksSlice,
    borrow: borrowSlice,
  },
});

export default store;
