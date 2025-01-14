import React from "react";
import { useState,useRef } from "react";
import { useBookAPI } from "../../hooks/useBookAPI";
import { useToast } from "../../hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../../state/bookdetail/booksSlice";
import { nanoid } from "nanoid";
import { client } from "../../main";
import { GET_SINGLE_BOOK_WITH_ADMIN } from "../../Graphql api/mutation";

function Sheet({ buttonname, closeWindowFn, windowStyle, color, bookid }) {
  const books = useSelector((state) => state.books.books);
  const { success } = useToast();
  const dispatch = useDispatch();
  const formRef = useRef();
  const {
    createBookWithAdmin,
    getAllBookWithAdmin,
    publicImageUrl,
    getSingleBook,
    updateBook,
  } = useBookAPI();
  const { error } = useToast();
  const [bookInfo, setBookInfo] = useState({
    bookid: "B" + nanoid().slice(0, 9),
    bookname: "",
    bookauthor: "",
    productiondate: "",
    bookstatus: "Borrowed",
    borrowcount: 0,
    bookcategory: "",
    bookimage: "",
  });

  

  async function addChangeListener(event) {
    const { name, value } = event.target;
    if (name === "borrowcount") {
      setBookInfo((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    } else if (name === "bookimage") {
      const file = event.target.files[0];
      const url = await publicImageUrl(file);
      setBookInfo((prevData) => ({
        ...prevData,
        ["bookimage"]: url,
      }));
    } else if (name === "bookstatus") {
      if (value.length === 0) {
        setBookInfo((prevData) => ({
          ...prevData,
          ["bookstatus"]: "Borrowed",
        }));
      } else {
        setBookInfo((prevData) => ({
          ...prevData,
          ["bookstatus"]: value,
        }));
      }
    } else {
      setBookInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log(value);
    }
  }
  const handleOpenCreateWindow = () => {
    formRef.current.reset(); 
  };

  async function createBook(event) {
    try {
      if (buttonname === "create") {
        for (let field in bookInfo) {
          if (field === "borrowcount") {
            continue;
          } else {
            if (bookInfo[field].length === 0) {
              return error("有必要欄位未輸入");
            }
          }
        }
        console.log(bookInfo);
        const oldData = await getAllBookWithAdmin();
        const newBook = await createBookWithAdmin(bookInfo);
        dispatch(setBook([...newBook, ...oldData]));
        closeWindowFn("none", event);
        handleOpenCreateWindow();
      }
      if (buttonname === "edit") {
        try {
          const { data } = await client.mutate({
            mutation: GET_SINGLE_BOOK_WITH_ADMIN,
            variables: {
              column: "bookid",
              info: bookid,
            },
          });
          const res = data.SingleBook.data;
          for (let field in bookInfo) {
            if (field === "borrowcount" && bookInfo["borrowcount"] !== 0) {
              res[0]["borrowcount"] = bookInfo["borrowcount"];
            } else if (bookInfo[field].length !== 0) {
              res[0][field] = bookInfo[field];
            }
          }
          const updateRes = await updateBook(res[0], bookid);
          const old = await getAllBookWithAdmin();
          const oldRes = old.filter(
            (item) => item.bookid !== updateRes[0].bookid
          );
          success("已更新一筆資料");
          dispatch(setBook([...updateRes, ...oldRes]));
          setBookInfo({
            bookid: "B" + nanoid().slice(0, 9),
            bookname: "",
            bookauthor: "",
            productiondate: "",
            bookstatus: "Borrowed",
            borrowcount: 0,
            bookcategory: "",
            bookimage: "",
          });
          closeWindowFn("none", event);
          handleOpenCreateWindow();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <form ref={formRef} className="Sheet" style={{ display: windowStyle }}>
      <div className="close" style={{ backgroundColor: color }}>
        <button
          className="closeBtn"
          onClick={(event) => closeWindowFn("none", event)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="content">
        <label htmlFor="bookname">BookName:</label>
        <input
          type="text"
          className="bookname"
          name="bookname"
          id="bookname"
          onChange={(event) => addChangeListener(event)}
        />
        <label htmlFor="bookauthor">BookAuthor:</label>
        <input
          type="text"
          className="bookauthor"
          name="bookauthor"
          id="bookauthor"
          onChange={(event) => addChangeListener(event)}
        />
        <label htmlFor="productiondate">ProductionDate:</label>
        <input
          type="date"
          className="productiondate"
          id="productiondate"
          name="productiondate"
          style={{ position: "relative", zIndex: "20" }}
          onChange={(event) => addChangeListener(event)}
        />
        <div className="bookstatus">
          <p>Book statue:</p>
          <div className="checkbox">
            <input
              type="radio"
              className="borrowed"
              name="bookstatus"
              id="borrowed"
              value="Borrowed"
              onChange={(event) => addChangeListener(event)}
            />
            <label htmlFor="bookstatus">Borrowed</label>
            <input
              type="radio"
              className="availabled"
              name="bookstatus"
              id="availabled"
              value="Available"
              onChange={(event) => addChangeListener(event)}
            />
            <label htmlFor="bookstatus">Available</label>

            <input
              type="radio"
              className="Reserved"
              name="bookstatus"
              id="Reserved"
              value="Reserved"
              onChange={(event) => addChangeListener(event)}
            />
            <label htmlFor="bookstatus">Reserved</label>
          </div>
        </div>
        <label htmlFor="borrowcount">BorrowCount:</label>
        <input
          type="number"
          className="borrowcount"
          id="borrowcount"
          name="borrowcount"
          onChange={(event) => addChangeListener(event)}
        />
        <label htmlFor="bookcategory">BookCategory:</label>
        <input
          type="text"
          className="bookcategory"
          id="bookcategory"
          name="bookcategory"
          onChange={(event) => addChangeListener(event)}
        />
        <label htmlFor="bookimage">BookImage:</label>
        <input
          type="file"
          className="bookimage"
          id="bookimage"
          name="bookimage"
          style={{
            height: "30px",
            textAlign: "center",
            lineHeight: "30px",
            alignItems: "center",
          }}
          onChange={(event) => addChangeListener(event)}
        />
      </div>
      <button
        className="createSheetBtn"
        style={{ backgroundColor: color }}
        onClick={(event) => createBook(event)}
      >
        {buttonname}
      </button>
    </form>
  );
}

export default Sheet;
