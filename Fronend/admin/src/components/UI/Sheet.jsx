import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useBookAPI } from "../../hooks/useBookAPI";
import { useToast } from "../../hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../../state/bookdetail/booksSlice";
import { button } from "../../styles/components/AskUserStyle";
function Sheet({ buttonname, closeWindowFn, windowStyle, color }) {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();
  const { createBookWithAdmin, getAllBookWithAdmin } = useBookAPI();
  const { error } = useToast();
  const [bookInfo, setBookInfo] = useState({
    bookid: "",
    bookname: "",
    bookauthor: "",
    productiondate: "",
    bookstatus: "",
    borrowcount: 0,
    bookcategory: "",
    bookimage: "",
  });

  function addChangeListener(event) {
    const { name, value } = event.target;
    if (name === "borrowcount") {
      console.log(name);
      setBookInfo((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    } else {
      setBookInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  async function createBook() {
    if (buttonname === "create") {
      for (let item in bookInfo) {
        if (bookInfo[item].length === 0) {
          return error("有必要欄位未輸入");
        }
      }
      const oldData = await getAllBookWithAdmin();
      const newBook = await createBookWithAdmin(bookInfo);
      dispatch(setBook([...newBook, ...oldData]));
    } else {
    }
  }

  return (
    <div className="Sheet" style={{ display: windowStyle }}>
      <div className="close" style={{ backgroundColor: color }}>
        <button
          className="closeBtn"
          onClick={(event) => closeWindowFn("none", event)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="content">
        <label htmlFor="bookid">Bookid:</label>
        <input
          type="text"
          className="bookid"
          name="bookid"
          id="bookid"
          onChange={(event) => addChangeListener(event)}
        />
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
          onChange={(event) => addChangeListener(event)}
        />
        <div className="bookstatus">
          <p>Book statue:</p>
          <div className="checkbox">
            <input
              type="radio"
              className="borrowed"
              name="borrowstatus"
              id="borrowed"
              value="borrowed"
              onChange={(event) => addChangeListener(event)}
            />
            <label htmlFor="borrowstatus">Borrowed</label>
            <input
              type="radio"
              className="availabled"
              name="borrowstatus"
              id="availabled"
              value="available"
              onChange={(event) => addChangeListener(event)}
            />
            <label htmlFor="borrowstatus">Available</label>
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
        className="createBtn"
        style={{ backgroundColor: color }}
        onClick={() => createBook()}
      >
        {buttonname}
      </button>
    </div>
  );
}

export default Sheet;
