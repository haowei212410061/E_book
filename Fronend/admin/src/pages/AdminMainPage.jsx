import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/global style/global.css";
import "../styles/pages/Main.css";
import adminUserImage from "../assets/Admin.png";
import { bookData } from "../../../../backend/Graphql/Data/Book";
import {useQuery} from '@apollo/client'
import {GET_ALL_BOOK_WITH_ADMIN} from "../Graphql api/query"
import ColumnTitle from "../components/ColumnTitle";
import BookList from "../components/BookList";
function AdminMainPage({ adminUserEmail, adminUserName }) {
  const { loading, error, data } = useQuery(GET_ALL_BOOK_WITH_ADMIN);
  const response = data?.AdminBooks?.data || []; // Safely access the response
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    console.log(data)
  }, [data]); 

  function addPageNumber() {
    const newCount = pageNumber + 10;
    if (newCount < response.length) {
      setPageNumber(newCount);
    }
  }
  function reducePageNumber() {
    const newCount = pageNumber - 10;
    if (newCount >= 0) {
      setPageNumber(newCount);
    }
  }
  if (loading) return <div>Loading...</div>; // Show loading state while data is fetching
  if (error) return <div>Error: {error.message}</div>; // Show error state if there's an error

  
  
  
  return (
    <div className="admin_main_container">
      <nav className="navbar">
        <header className="user">
          <div className="image">
            <img src={adminUserImage} alt="image" />
          </div>

          <div className="user_info">
            <h4>{adminUserEmail}Admin001@gmail.com</h4>
            <p>{adminUserName}Admin01</p>
          </div>
        </header>
        <menu className="menu">
          <div className="list">
            <h4>
              <i className="fa-solid fa-book-atlas"></i> 書籍管理
            </h4>
            <ul>
              <li>
                <i className="fa-solid fa-book"></i>Book Management
              </li>
              <li>
                <i className="fa-regular fa-money-bill-1"></i>Borrow Records
                Management
              </li>
            </ul>
          </div>
          <div className="list">
            <h4>使用者管理</h4>
            <ul>
              <li>
                <i className="fa-solid fa-hammer"></i>AdminUser Management
              </li>
              <li>
                <i className="fa-solid fa-user"></i>User Management
              </li>
            </ul>
          </div>
          <div className="list">
            <h4>
              <i className="fa-solid fa-file"></i> 報表管理
            </h4>
            <ul>
              <li>
                <i className="fa-solid fa-file"></i>Book Report
              </li>
              <li>
                <i className="fa-solid fa-file"></i>Borrow Records Report
              </li>
            </ul>
          </div>

          <div className="list">
            <h4>
              <i className="fa-solid fa-file"></i> 登出
            </h4>
            <ul>
              <li onClick={() => navigate("/")}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
              </li>
            </ul>
          </div>
        </menu>
      </nav>
      <section className="main_content">
        <div className="page_title">
          <h3>Book Managenment</h3>
        </div>
        <div className="filter">
          <div className="search_section">
            <p>Your data</p>
            <button className="search_btn">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              className="search"
              placeholder="enter your data"
            ></input>
          </div>

          <div className="column">
            <p>column</p>
            <select name="book_column" id="book_column">
              <option value="" disabled defaultChecked>
                --請選擇以下欄位--
              </option>
              <option value="bookname">Book Name</option>
              <option value="bookauthor">bookauthor</option>
              <option value="bookstatus">bookstatus</option>
              <option value="borrowcount">borrowcount</option>
              <option value="bookcategory">bookcategory</option>
            </select>
          </div>
        </div>

        <table className="data">
          <thead className="table_head">
            <tr className="column">
              <ColumnTitle data={Object.keys(response[0]).filter((item)=>item !== '__typename')} />
            </tr>
          </thead>
          <tbody className="table_body">
              <BookList data={response} page={pageNumber} />
          </tbody>
        </table>

        <div className="buttons">
          <button onClick={reducePageNumber} className="previous"><i className="fa-solid fa-circle-chevron-left"></i>上一頁</button>
          <button onClick={addPageNumber} className="next"><i className="fa-solid fa-circle-chevron-right"></i>下一頁</button>
        </div>
      </section>
    </div>
  );
}

export default AdminMainPage;
