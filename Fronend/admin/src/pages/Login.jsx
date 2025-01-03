import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/pages/Login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import {useMutation} from "@apollo/client";
import { ADMIN_USER_LOGIN } from "../Graphql api/mutation";
//useMutation = 需要手動觸發 例如按鈕點擊觸法
//useQuery = 在組件渲染時會自動觸發。通常，當元件首次載入或任何其依賴項（例如，輸入變數）發生變更時，您可以使用它來取得資料
let token;
function Login() {
  const [adminUserLogin] = useMutation(ADMIN_USER_LOGIN);
  const NavigateToMainWeb = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    console.log({
      account: account,
      password: password,
    });
  }, [account, password]);
  
  function OnAccountChangeListener(event) {
    setAccount(event.target.value);
  }

  function OnPasswordChangeListener(event) {
    setPassword(event.target.value);
  }

  async function Userlogin() {
    try{
      if(account.length === 0 || password.length === 0){
        return toast.warning("帳號密碼不可為空")
      }
      const { data } = await adminUserLogin({
        variables: {
          email: account,
          password: password,
        },
      });
      token = data.AdminUserLogin.jwt;
      console.log(data,token)
      NavigateToMainWeb('/main')
    }catch(error){
      console.log(error)
      toast.warning("帳號密碼錯誤")
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
