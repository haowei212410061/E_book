import { useCallback } from "react";
import { client } from "../main";
import { GET_ALL_BOOK_WITH_ADMIN } from "../Graphql api/query";
import { CREATE_BOOK, DELETE_BOOK } from "../Graphql api/mutation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBook, setBook } from "../state/bookdetail/booksSlice";
import { toast } from "react-toastify";
export function useBookAPI() {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
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
        dispatch(setBook(updatedBooks)); // Update Redux store with the new list
        toast.success("Book deleted successfully.");
      }
    } catch (error) {
      toast.error("Failed to delete book. Please try again.");
      console.error("Error deleting book:", error);
    }
  };

  return { getAllBookWithAdmin, createBookWithAdmin, deleteBookWithAdmin };
}
