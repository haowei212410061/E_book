import React from "react";
import { useState, useRef } from "react";
import { useCommand } from "../../hooks/useCommand";
import { useToast } from "../../hooks/useToast";
import { useAdminUserAPI } from "../../hooks/useAdminUserAPI";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setAdminUser } from "../../state/adminUser/adminSlice";
import { useCheckVaild } from "../../hooks/useCheckVaild";
function AdminUserSheet({
  closeWindow,
  info,
  color,
  windowStyle,
  adminid,
  columns,
}) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const adminUsers = useSelector((state) => state.adminUser.adminUser);
  const [input, setInput] = useState("");
  const { addEditChangeListener } = useCommand();
  const {
    checkPasswordLength,
    checkPasswordValid,
    checkEmpty,
    checkDuplicate,
  } = useCheckVaild();
  const {
    getAllAdminUser,
    updateEmail,
    updatePassword,
    deleteAdminUser,
    createAdminUser,
  } = useAdminUserAPI();
  const { warning, success, error } = useToast();
  const [createAdmin, setCreateAdminUser] = useState({
    adminid: "A" + nanoid().slice(0, 9),
    username: "",
    password: "",
    email: "",
  });

  function addCreateChangeListener(event) {
    const { name, value } = event.target;
    setCreateAdminUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function create(event) {
    event.preventDefault();
    const data = await getAllAdminUser();

    console.log(data);
    for (let item in createAdmin) {
      if (checkEmpty(createAdmin[item])) {
        warning(`${item}欄位不可為空`);
        return;
      } else {
        if (item === "email") {
          if (checkDuplicate(data, createAdmin["email"])) {
            warning("此郵件已存在 請重新輸入");
            return;
          }
        }
        if (item === "password" && !checkPasswordLength(createAdmin[item])) {
          warning(`密碼只少需要8個字元`);
          return;
        }
        if (item === "password" && !checkPasswordValid(createAdmin[item])) {
          warning(`密碼須包含大小寫字母及數字`);
          return;
        }
      }
    }
    try {
      const res = await createAdminUser(createAdmin);
      if (!res) {
        error("創建失敗");
        return;
      }
      success("創建成功");
    } catch (error) {
      console.log(error);
    }
    closeWindow("none", event);
    handleOpenCreateWindow();
  }

  const handleOpenCreateWindow = () => {
    formRef.current.reset();
  };

  async function updateInfo(event) {
    event.preventDefault();
    if (info == "Password") {
      if (input.length === 0) {
        warning("欄位不可為空");
        setInput("");
        return;
      } else if (input.length < 8) {
        warning("密碼至少要八個字元");
        setInput("");
        return;
      } else {
        try {
          const res = await updatePassword(adminid, input);
          closeWindow("none", event);
          success("已更新密碼");
          setInput("");
          handleOpenCreateWindow();
        } catch (error) {
          console.log(error);
        }
      }
    } else if (info === "Email") {
      if (input.length === 0) {
        setInput("");
        return warning("欄位不可為空");
      } else if (adminUsers.includes(info)) {
        setInput("");
        return warning("此郵件已有人使用");
      } else {
        try {
          await updateEmail(adminid, input);
          success("已更新郵件");
          closeWindow("none", event);
          setInput("");
          handleOpenCreateWindow();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return info === "create" ? (
    <div className="adminUserSheet" style={{ display: windowStyle }}>
      <div className="close" style={{ backgroundColor: color }}>
        <button
          className="closeBtn"
          onClick={(event) => {
            closeWindow("none", event);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form action="" className="sheet_content" ref={formRef}>
        {columns.map((item) => {
          return (
            <>
              <label
                htmlFor={item}
                style={{ fontSize: "14px", marginLeft: "30px" }}
              >
                {item.toUpperCase()}
              </label>
              <input
                name={item}
                onChange={(event) => addCreateChangeListener(event)}
                className={item}
                type="text"
              />
            </>
          );
        })}
        <div>
          <button
            onClick={(event) => create(event)}
            style={{ backgroundColor: color }}
            className="create"
          >
            create
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="adminUserSheet" style={{ display: windowStyle }}>
      <div className="close" style={{ backgroundColor: color }}>
        <button
          className="closeBtn"
          onClick={(event) => {
            setInput("");
            closeWindow("none", event);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="title">
        <h2>{info} reset</h2>
      </div>
      <div className="content">
        <p>
          To reset your {info}. Please enter your new {info}{" "}
        </p>
      </div>

      <form action="" className="sheet_content" ref={formRef}>
        <input
          value={input}
          type="text"
          className="edit_password"
          onChange={(event) => addEditChangeListener(event, setInput)}
          placeholder={`Enter your new ${info}`}
        />
        <div>
          <button
            style={{ backgroundColor: color }}
            onClick={(event) => updateInfo(event)}
            className="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUserSheet;
