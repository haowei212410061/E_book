import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/global style/global.css";
import "../styles/pages/Main.css";
import adminUserImage from "../assets/Admin.png";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_BOOK_WITH_ADMIN } from "../Graphql api/query";
import { GET_SINGLE_BOOK_WITH_ADMIN } from "../Graphql api/mutation";
import ColumnTitle from "../components/UI/ColumnTitle";
import BookList from "../components/UI/BookList";
import Navbar from "../components/Navbar";
import AdminTitle from "../components/UI/AdminTitle";
import Filter from "../components/Filter";
import ControlPageBtn from "../components/UI/ControlPageBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBook } from "../state/bookdetail/booksSlice";
function getUserLocalStorage() {
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  return { username: user.data.username, email: user.data.email };
}
function getBooksLocalStorage() {
  const books = JSON.parse(localStorage.getItem("Allbooks"));
  return books;
}

function AdminMainPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const user = getUserLocalStorage();
  const [pageNumber, setPageNumber] = useState(0);
  const [column, setColumn] = useState("bookname");
  const [input, setInput] = useState("");
  const [getSingleBookWithAdmin] = useMutation(GET_SINGLE_BOOK_WITH_ADMIN);

  useEffect(() => {
    const allbook = getBooksLocalStorage();
    dispatch(fetchAllBook(allbook));
  }, []);

  function selectFunc(event) {
    const column = event.target.value;
    setColumn(column);
  }
  function addEditChangeListener(event) {
    const userInput = event.target.value;
    console.log(userInput);
    setInput(userInput);
  }
  function addPageNumber() {
    if (books.length === 0) {
      setButtonDisable(false);
    }
    const newCount = pageNumber + 10;
    if (newCount < books.length) {
      setPageNumber(newCount);
    }
  }
  function reducePageNumber() {
    if (books.length === 0) {
      setButtonDisable(false);
    }
    const newCount = pageNumber - 10;
    if (newCount >= 0) {
      setPageNumber(newCount);
    }
  }
  async function getSingleBook(column, info) {
    try {
      if (input.length === 0) {
        toast.warning("有必要欄位未輸入");
      } else {
        const { data } = await getSingleBookWithAdmin({
          variables: {
            column: column,
            info: info,
          },
        });
        const res = data.SingleBook.data;
        if (res.length === 0) {
          dispatch(fetchAllBook([]))
          toast.error("No data");
        } else {
          dispatch(fetchAllBook(res))
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
      toast.warning("fail to fetch single book");
    }
  }

  return (
    <div className="admin_main_container">
      <Navbar
        email={user.email}
        username={user.username}
        image={adminUserImage}
      />
      <section className="main_content">
        <AdminTitle title={"Book Managenment"} />
        <Filter
          getSingleBookFunc={getSingleBook}
          selectFunc={selectFunc}
          editChangeListener={addEditChangeListener}
          column={column}
          info={input}
        />
        <table className="data">
          <thead className="table_head">
            <tr className="column">
              {books.length === 0 ? <th>loading...</th>:<ColumnTitle data={books}/>}
            </tr>
          </thead>
          <tbody className="table_body">
            {books.length === 0 ? <tr><td>loading...</td></tr>:<BookList data={books} page={pageNumber}/>}
          </tbody>
        </table>
        <ControlPageBtn reduce={reducePageNumber} add={addPageNumber} />
      </section>
    </div>
  );
}
export default AdminMainPage;
