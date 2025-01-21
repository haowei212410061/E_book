import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCommand } from "../hooks/useCommand";
import { useAdminUserAPI } from "../hooks/useAdminUserAPI";
import { useSelector, useDispatch } from "react-redux";
import adminUserImage from "../assets/Admin.png";
import AdminTitle from "../components/UI/AdminTitle";
import Filter from "../components/Filter";
import ColumnTitle from "../components/UI/ColumnTitle";
import ControlPageBtn from "../components/UI/ControlPageBtn";
import DataList from "../components/UI/DataList";
import { setAdminUser } from "../state/adminUser/adminSlice";
import "../styles/pages/Main.css";
import Windowbackground from "../components/UI/WindowBackground";
import AdminUserSheet from "../components/UI/AdminUserSheet";

function AdminUserManagement() {
  const { getUserLocalStorage, addPageNumber, reducePageNumber } = useCommand();
  const {
    getAllAdminUser,
    getSingleAdminUser,
    updateEmail,
    updatePassword,
    deleteAdminUser,
    createAdminUser,
  } = useAdminUserAPI();
  const user = getUserLocalStorage();
  const columns = ["adminid", "username", "email"];
  const adminUsers = useSelector((state) => state.adminUser.adminUser);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const [background, setBackground] = useState("none");
  const [adminId, setAdminId] = useState("");
  const [windowName, setWindowName] = useState("");
  const [windowStyle,setWindowStyle] = useState("")
  const [windowColor,setWindowColor] = useState("")
  const fields = ["username","email","password"]
  useEffect(() => {
    getAllAdminUser().then((data) => {
      dispatch(setAdminUser(data));
    });
  }, []);
  const style = {
    width: "900px",
    height: "400px",
    marginLeft: "20px",
    borderCollapse: "collapse",
  };
  const buttonStyle = {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    marginLeft: "200px",
  };

  function openEditWindow(style,event) {
    const adminid = event.target.id;
    const buttonName = event.target.className;
    if(buttonName === "editPassword"){
        setWindowName("Password")
        setAdminId(adminid);
        setBackground(style);
        setWindowStyle(style);
        setWindowColor("rgb(57, 163, 110)")
    }else if(buttonName === "editEmail"){
        setWindowName("Email")
        setAdminId(adminid);
        setBackground(style);
        setWindowStyle(style);
        setWindowColor("rgb(57, 163, 110)")
    }else if(buttonName === 'createBtn'){
        setWindowName("create")
        setBackground(style);
        setWindowStyle(style);
        setWindowColor("rgb(35, 149, 255)")
    }
    else{
        setBackground(style);
        setWindowStyle(style);
    }
    
  }

  return (
    <div className="admin_main_container">
      <Navbar
        email={user.email}
        username={user.username}
        image={adminUserImage}
      />
      <Windowbackground backgroundStyle={background} />

      <section className="main_content">
        <AdminTitle title={"AdminUser Management"} />

        <Filter
          reloadFn={getAllAdminUser}
          getSingleData={getSingleAdminUser}
          ShouldDisplay={"block"}
          options={columns}
          defaultValue={"adminid"}
          OpenCreateWindow={openEditWindow}
          exportDisplay={"none"}
          
        />
        <AdminUserSheet  columns={fields} closeWindow={openEditWindow} info={windowName} color={windowColor} windowStyle={windowStyle} adminid={adminId}/>
        <table style={style} className="data">
          <thead className="table_head_admin">
            <tr className="column_admin">
              {adminUsers.length === 0 ? (
                <th>loading...</th>
              ) : (
                <ColumnTitle data={adminUsers} columnStyle={"admin"} />
              )}
            </tr>
          </thead>
          <tbody className="table_body_admin">
            {adminUsers.length === 0 ? (
              <tr>
                <td style={{ textAlign: "center" }}>no data...</td>
              </tr>
            ) : (
              <DataList
              deleteFunc={deleteAdminUser}
                openEditWindow={openEditWindow}
                database={"adminUser"}
                columnStyle={"admin"}
                buttonStyle={"flex"}
                page={pageNumber}
                data={adminUsers}
              />
            )}
            <ControlPageBtn
              add={addPageNumber(adminUsers, pageNumber, setPageNumber)}
              reduce={reducePageNumber(pageNumber, setPageNumber)}
              buttonStyle={buttonStyle}
            />
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminUserManagement;
