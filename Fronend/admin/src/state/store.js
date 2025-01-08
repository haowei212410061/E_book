import { configureStore } from '@reduxjs/toolkit';  
import booksSlice from './bookdetail/booksSlice'

const store = configureStore({
  //改變 or 取得state的function
  reducer: {
    books: booksSlice
  }
});

export default store