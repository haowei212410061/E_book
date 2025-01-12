import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/global style/global.css";
import "../styles/pages/Main.css";
import adminUserImage from "../assets/Admin.png";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_BOOK_WITH_ADMIN } from "../Graphql api/query";
import {
  DELETE_BOOK,
  GET_SINGLE_BOOK_WITH_ADMIN,
} from "../Graphql api/mutation";
import ColumnTitle from "../components/UI/ColumnTitle";
import BookList from "../components/UI/BookList";
import Navbar from "../components/Navbar";
import AdminTitle from "../components/UI/AdminTitle";
import Filter from "../components/Filter";
import ControlPageBtn from "../components/UI/ControlPageBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBook,
  deleteBook,
  setBook,
} from "../state/bookdetail/booksSlice";
import { client } from "../main";
import { useBookAPI } from "../hooks/useBookAPI";
import { useToast } from "../hooks/useToast";
import Sheet from "../components/UI/Sheet";
import Windowbackground from "../components/UI/WindowBackground";
function getUserLocalStorage() {
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  return { username: user.username, email: user.email };
}
function getBooksLocalStorage() {
  const books = JSON.parse(localStorage.getItem("Allbooks"));
  return books;
}
async function getAllBook() {
  try {
    const { data } = await client.query({
      query: GET_ALL_BOOK_WITH_ADMIN,
    });
    return data.AdminBooks.data;
  } catch (error) {
    console.log(error);
  }
}

function AdminMainPage() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const { success, warning, error } = useToast();
  const user = getUserLocalStorage();
  const [pageNumber, setPageNumber] = useState(0);
  const [column, setColumn] = useState("bookname");
  const [closeWindowStyle, setCloseWindowStyle] = useState("none");
  const [input, setInput] = useState("");
  const [getSingleBookWithAdmin] = useMutation(GET_SINGLE_BOOK_WITH_ADMIN);
  const [windowStatus, setWindowStatus] = useState("");
  const [backgroundStyle, setbackgroundStyle] = useState("none");
  const { deleteBookWithAdmin } = useBookAPI();

  useEffect(() => {
    getAllBook().then((data) => {
      dispatch(setBook(data));
      console.log(books);
    });
  }, []);

  function selectFunc(event) {
    const column = event.target.value;
    console.log(column);
    setColumn(column);
  }
  function addEditChangeListener(event) {
    const userInput = event.target.value;
    console.log(userInput, column);
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
      if (info.length === 0 || column.length === 0) {
        warning("有必要欄位未輸入");
      } else {
        const response = await getSingleBookWithAdmin({
          variables: {
            column: column,
            info: info,
          },
        });
        const res = response.data.SingleBook.data;
        console.log(response);
        if (res.length === 0) {
          dispatch(setBook([]));
          error("No data");
        } else {
          dispatch(setBook(res));
          success(`搜索到${res.length}筆資料`);
        }
      }
    } catch (error) {
      console.log(error);
      warning("fail to fetch single book");
    }
  }

  function closeWindow(style, event) {
    const status = event.target.className;
    if (status === "createBtn") {
      setWindowStatus("create");
      setbackgroundStyle("block");
      setCloseWindowStyle(style);
    } else if (status == "editBtn") {
      setWindowStatus("edit");
      setbackgroundStyle("block");
      setCloseWindowStyle(style);
    } else {
      setWindowStatus("");
      setCloseWindowStyle(style);
      setbackgroundStyle("none");
    }
  }

  return (
    <div
      className="admin_main_container"
      style={{ backgroundColor: "rgb(197, 197, 206)" }}
    >
      <Windowbackground backgroundStyle={backgroundStyle} />
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
          OpenCreateWindow={closeWindow}
        />

        {windowStatus === "create" ? (
          <Sheet
            buttonname={"create"}
            closeWindowFn={closeWindow}
            windowStyle={closeWindowStyle}
            color={"rgb(35, 149, 255)"}
          />
        ) : (
          <Sheet
            buttonname={"Edit"}
            closeWindowFn={closeWindow}
            windowStyle={closeWindowStyle}
            color={"rgb(57, 163, 110)"}
          />
        )}

        <table className="data">
          <thead className="table_head">
            <tr className="column">
              {books.length === 0 ? (
                <th>loading...</th>
              ) : (
                <ColumnTitle data={books} />
              )}
            </tr>
          </thead>
          <tbody className="table_body">
            {books.length === 0 ? (
              <tr>
                <td>loading...</td>
              </tr>
            ) : (
              <BookList
                data={books}
                page={pageNumber}
                deleteFunc={deleteBookWithAdmin}
                openEditWindow={closeWindow}
              />
            )}
          </tbody>
        </table>
        <ControlPageBtn reduce={reducePageNumber} add={addPageNumber} />
      </section>
    </div>
  );
}
export default AdminMainPage;
