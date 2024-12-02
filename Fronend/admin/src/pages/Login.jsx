import React from "react";
import "../styles/Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  return (
    <>
      <div className="main_container">
        <div className="admin_title">
          <div className="admin">
            <i class="fa-solid fa-user"></i>
          </div>
          <h2>Sign in Admin</h2>
        </div>

        <div className="icons">
          <div className="icon">
            <i className="fa-brands fa-github"></i>
          </div>
          <div className="icon">
            <i class="fa-brands fa-google-plus-g"></i>
          </div>
          <div className="icon">
            <i class="fa-brands fa-linkedin-in"></i>
          </div>
        </div>

        <div className="admin_Input">
          <input className="edit_acc" type="text" placeholder="請輸入帳號" />
          <input
            className="edit_password"
            type="text"
            placeholder="請輸入密碼"
          />

          <a>Forget your password?</a>

          <div className="check_button">
            <button className="LoginBtn">登入</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
