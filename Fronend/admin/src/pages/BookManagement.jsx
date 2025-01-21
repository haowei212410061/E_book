import React, { useEffect, useState } from "react";
import "../styles/global style/global.css";
import "../styles/pages/Main.css";
import adminUserImage from "../assets/Admin.png";
import ColumnTitle from "../components/UI/ColumnTitle";
import DataList from "../components/UI/DataList";
import Navbar from "../components/Navbar";
import AdminTitle from "../components/UI/AdminTitle";
import Filter from "../components/Filter";
import ControlPageBtn from "../components/UI/ControlPageBtn";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../state/bookdetail/booksSlice";
import { useBookAPI } from "../hooks/useBookAPI";
import Sheet from "../components/UI/Sheet";
import Windowbackground from "../components/UI/WindowBackground";

function getUserLocalStorage() {
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  return { username: user.username, email: user.email };
}

function BookManagement() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const user = getUserLocalStorage();
  const [pageNumber, setPageNumber] = useState(0);
  const [closeWindowStyle, setCloseWindowStyle] = useState("none");
  const [windowStatus, setWindowStatus] = useState("");
  const [backgroundStyle, setbackgroundStyle] = useState("none");
  const [updateBookid, setUpdateBookId] = useState("");
  const {getAllBookWithAdmin,deleteBookWithAdmin, getSingleBook } = useBookAPI();
  const columns = [
    "bookname",
    "bookauthor",
    "bookstatus",
    "borrowcount",
    "bookcategory",
  ];
  const style = {
    width: "1200px",
    height: "400px",
    marginLeft: "20px",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  };
  const buttonStyle = {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    marginLeft: "500px",
  };

  useEffect(() => {
    getAllBookWithAdmin().then((data) => {
      console.log(data)
      dispatch(setBook(data));
    });
  }, []);

  function addPageNumber() {
    const newCount = pageNumber + 10;
    if (newCount < books.length) {
      setPageNumber(newCount);
    }
  }
  function reducePageNumber() {
    const newCount = pageNumber - 10;
    if (newCount >= 0) {
      setPageNumber(newCount);
    }
  }

  async function closeWindow(style, event) {
    const status = event.target.className;
    if (status === "createBtn") {
      setWindowStatus("create");
      setbackgroundStyle("block");
      setCloseWindowStyle(style);
    } else if (status == "editBtn") {
      setWindowStatus("edit");
      setbackgroundStyle("block");
      setCloseWindowStyle(style);
      setUpdateBookId(event.target.id);
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
          getSingleData={getSingleBook}
          OpenCreateWindow={closeWindow}
          ShouldDisplay={"block"}
          options={columns}
          defaultValue={"bookname"}
          reloadFn={getAllBookWithAdmin}
          exportDisplay={"none"}
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
            buttonname={"edit"}
            closeWindowFn={closeWindow}
            windowStyle={closeWindowStyle}
            color={"rgb(57, 163, 110)"}
            bookid={updateBookid}
          />
        )}

        <table style={style} className="data">
          <thead className="table_head">
            <tr className="column">
              {books.length === 0 ? (
                <th>loading...</th>
              ) : (
                <ColumnTitle data={books} columnStyle={"book"} />
              )}
            </tr>
          </thead>
          <tbody className="table_body">
            {books.length === 0 ? (
              <tr>
                <td>loading...</td>
              </tr>
            ) : (
              <DataList
                database={"book"}
                buttonStyle={"block"}
                data={books}
                page={pageNumber}
                deleteFunc={deleteBookWithAdmin}
                openEditWindow={closeWindow}
                columnStyle={"book"}
              />
            )}
            <ControlPageBtn
              buttonStyle={buttonStyle}
              reduce={reducePageNumber}
              add={addPageNumber}
            />
          </tbody>
        </table>
      </section>
    </div>
  );
}
export default BookManagement;
