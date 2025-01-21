import React, {useState } from "react";
import "../styles/pages/Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADMIN_USER_LOGIN } from "../Graphql api/mutation";
import { client } from "../main";
import { GET_ALL_BOOK_WITH_ADMIN } from "../Graphql api/query";
import { useDispatch, useSelector } from "react-redux";
import { setBook } from "../state/bookdetail/booksSlice";
import { useToast } from "../hooks/useToast";
//useMutation = 需要手動觸發 例如按鈕點擊觸法
//useQuery = 在組件渲染時會自動觸發。通常，當元件首次載入或任何其依賴項（例如，輸入變數）發生變更時，您可以使用它來取得資料
let token;
function Login() {
  const [adminUserLogin] = useMutation(ADMIN_USER_LOGIN);
  const dispatch = useDispatch();
  const NavigateToMainWeb = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { warning } = useToast();

  async function fetchBooks() {
    try {
      const res = await client.query({
        query: GET_ALL_BOOK_WITH_ADMIN,
      });
      localStorage.setItem(
        "Allbooks",
        JSON.stringify(res.data.AdminBooks.data)
      );
      return res.data.AdminBooks.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      error("Failed to load books.");
    }
  }

  function OnAccountChangeListener(event) {
    setAccount(event.target.value);
  }

  function OnPasswordChangeListener(event) {
    setPassword(event.target.value);
  }

  async function Userlogin() {
    try {
      if (account.length === 0 || password.length === 0) {
        return warning("帳號密碼不可為空");
      }
      const { data } = await adminUserLogin({
        variables: {
          email: account,
          password: password,
        },
      });
      console.log(data, token);
      localStorage.setItem(
        "UserLogin",
        JSON.stringify(data.AdminUserLogin.data)
      );
      const res = await fetchBooks();
      dispatch(setBook(res));
      NavigateToMainWeb("/main",{state:{books:res}});
    } catch (error) {
      console.log(error);
      warning("帳號密碼錯誤");
    }
  }
  return (
    <>
      <div className="main_container">
        <div className="admin_title">
          <div className="admin">
            <i className="fa-solid fa-user"></i>
          </div>
          <h2>Sign in Admin</h2>
        </div>

        <div className="icons">
          <div className="icon">
            <i className="fa-brands fa-github"></i>
          </div>
          <div className="icon">
            <i className="fa-brands fa-google-plus-g"></i>
          </div>
          <div className="icon">
            <i className="fa-brands fa-linkedin-in"></i>
          </div>
        </div>

        <div className="admin_Input">
          <input
            className="edit_acc"
            type="text"
            placeholder="請輸入帳號"
            onChange={OnAccountChangeListener}
          />
          <input
            className="edit_password"
            type="text"
            placeholder="請輸入密碼"
            onChange={OnPasswordChangeListener}
          />

          <a>Forget your password?</a>

          <div className="check_button">
            <button className="LoginBtn" onClick={Userlogin}>
              登入
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
