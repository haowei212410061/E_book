import { useCallback } from "react";
import { client } from "../main";
import { GET_ALL_BOOK_WITH_ADMIN } from "../Graphql api/query";
import { CREATE_BOOK, DELETE_BOOK, GET_SINGLE_BOOK_WITH_ADMIN ,UPDATE_BOOK_WITH_ADMIN} from "../Graphql api/mutation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBook, setBook } from "../state/bookdetail/booksSlice";
import { useToast } from "./useToast";

export function useBookAPI() {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const { success, warning, error } = useToast();
  
  const getAllBookWithAdmin = async () => {
    try {
      const { data } = await client.query({
        query: GET_ALL_BOOK_WITH_ADMIN,
      });
      return data.AdminBooks.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createBookWithAdmin = async (book) => {
    try {
      const { data } = await client.mutate({
        mutation: CREATE_BOOK,
        variables: {
          bookid: book.bookid,
          bookname: book.bookname,
          bookauthor: book.bookauthor,
          productiondate: book.productiondate,
          bookstatus: book.bookstatus,
          borrowcount: book.borrowcount,
          bookcategory: book.bookcategory,
          bookimage: book.bookimage,
        },
      });
      return data.createBook.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBookWithAdmin = async (bookid) => {
    try {
      const res = await client.mutate({
        mutation: DELETE_BOOK,
        variables: { bookid },
      });

      const { data } = await client.query({
        query: GET_ALL_BOOK_WITH_ADMIN,
      });
      const deleteData = res.data.deleteBook.data;
      if (deleteData.length > 0) {
        const updatedBooks = books.filter((book) => book.bookid !== bookid);
        dispatch(setBook(updatedBooks));
        success("Book deleted successfully.");
      }
    } catch (error) {
      error("Failed to delete book. Please try again.");
      console.error("Error deleting book:", error);
    }
  };

  const publicImageUrl = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbyxkuikt/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getSingleBook = async (column, info) => {
    try {
      if (info.length === 0 || column.length === 0) {
        warning("有必要欄位未輸入");
      } else {
        const response = await client.mutate({
          mutation:GET_SINGLE_BOOK_WITH_ADMIN,
          variables: {
            column: column,
            info: info,
          },
        });
        console.log(column,info)
        const res = response.data.SingleBook.data;
        console.log(res)
        if (res.length === 0) {
          dispatch(setBook([]));
          error("No data");
        } else {
          console.log(res)
          dispatch(setBook(res));
          success(`搜索到${res.length}筆資料`);
        }
      }
    } catch (error) {
      console.log(error);
      warning("fail to fetch single book");
    }
  };

  const updateBook = async(book,bookid)=>{
    try{
      const { data } = await client.mutate({
        mutation:UPDATE_BOOK_WITH_ADMIN,
        variables: {
          bookid: bookid,
          bookname: book.bookname,
          bookauthor: book.bookauthor,
          productiondate: book.productiondate,
          bookstatus: book.bookstatus,
          borrowcount: book.borrowcount,
          bookcategory: book.bookcategory,
          bookimage: book.bookimage
        }
      });
      return data.updateBook.data
    }catch(error){
      console.log(error)
    }
  }

  return {
    getAllBookWithAdmin,
    createBookWithAdmin,
    deleteBookWithAdmin,
    publicImageUrl,
    getSingleBook,
    updateBook
  };
}
