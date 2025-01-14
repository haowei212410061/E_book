import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ email, username, image }) {
  const navigate = useNavigate();
  function LogOut() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav className="navbar">
      <header className="user">
        <div className="image">
          <img src={image} alt="image" />
        </div>
        <div className="user_info">
          <h4>{email}</h4>
          <p>{username}</p>
        </div>
      </header>
      <menu className="menu">
        <div className="list">
          <h4>
            <i className="fa-solid fa-book-atlas"></i> 書籍管理
          </h4>
          <ul>
            <li onClick={() => navigate("/main")}>
              <i className="fa-solid fa-book"></i>Book Management
            </li>
            <li onClick={()=> navigate("/borrow")}>
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
            <li onClick={() => LogOut()}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
            </li>
          </ul>
        </div>
      </menu>
    </nav>
  );
}

export default Navbar;
