import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useCommand } from "../hooks/useCommand";
import { useUserAPI } from "../hooks/useUserAPI";
import { useSelector, useDispatch } from "react-redux";
import adminUserImage from "../assets/Admin.png";
import AdminTitle from "../components/UI/AdminTitle";
import { setUsers } from "../state/user/userSlice";
import Filter from "../components/Filter";
import ControlPageBtn from "../components/UI/ControlPageBtn";
import ColumnTitle from "../components/UI/ColumnTitle";
import DataList from "../components/UI/DataList";
import "../styles/pages/Main.css";
function UserManagement() {
  const [pageNumber, setPageNumber] = useState(0);
  const { getUserLocalStorage, addPageNumber, reducePageNumber } = useCommand();
  const { getAllUsers, getSingleUser } = useUserAPI();
  const Users = useSelector((state) => state.user.user);
  const user = getUserLocalStorage();
  const dispatch = useDispatch();
  const columns = ["userid", "username", "password", "email"];

  useEffect(() => {
    getAllUsers().then((data) => {
      dispatch(setUsers(data));
    });
  }, []);

  const style = {
    width: "700px",
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

  return (
    <div className="admin_main_container">
      <Navbar
        email={user.email}
        username={user.username}
        image={adminUserImage}
      />
      <section className="main_content">
        <AdminTitle title={"User Management"} />
        <Filter
          exportDisplay={"none"}
          getSingleData={getSingleUser}
          ShouldDisplay={"none"}
          options={columns}
          defaultValue={"userid"}
          reloadFn={getAllUsers}
        />
        <table style={style} className="data">
          <thead className="table_head_user">
            <tr className="column_user">
              {Users.length === 0 ? (
                <th>loading...</th>
              ) : (
                <ColumnTitle data={Users} columnStyle={"user"} />
              )}
            </tr>
          </thead>
          <tbody className="table_body_user">
            {Users.length === 0 ? (
              <tr>
                <td style={{ textAlign: "center" }}>no data...</td>
              </tr>
            ) : (
              <DataList
                buttonStyle={"none"}
                page={pageNumber}
                data={Users}
                columnStyle={"user"}
              />
            )}
            <ControlPageBtn
              add={addPageNumber(Users, pageNumber, setPageNumber)}
              reduce={reducePageNumber(pageNumber, setPageNumber)}
              buttonStyle={buttonStyle}
            />
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default UserManagement;
