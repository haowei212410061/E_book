import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import adminUserImage from "../assets/Admin.png";
import AdminTitle from "../components/UI/AdminTitle";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../components/Filter";
import { useCommand } from "../hooks/useCommand";
import { useBorrowRecordAPI } from "../hooks/useBorrowRecordAPI";
import { setBorrowRecord } from "../state/borrowRecord/borrowSlice";
import ColumnTitle from "../components/UI/ColumnTitle";
import DataList from "../components/UI/DataList";
import ControlPageBtn from "../components/UI/ControlPageBtn";
function getUserLocalStorage() {
  const user = JSON.parse(localStorage.getItem("UserLogin"));
  return { username: user.username, email: user.email };
}

function BorrowRecordManagement() {
  const user = getUserLocalStorage();
  const borrowRecord = useSelector((state) => state.borrow.borrow);
  const dispatch = useDispatch();
  const { getAllBorrowRecord, getSingleBorrowRecord } = useBorrowRecordAPI();
  const { addPageNumber, reducePageNumber } = useCommand();
  const columns = ["userid", "bookid"];
  const [pageNumber, setPageNumber] = useState(0);
  const style = {
    width: "600px",
    height: "400px",
    marginLeft: "20px",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  };
  const buttonStyle = {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
    marginLeft:"200px",
  }

  useEffect(() => {
    getAllBorrowRecord().then((data) => {
      dispatch(setBorrowRecord(data));
      console.log(data);
    });
  }, []);

  return (
    <div className="admin_main_container">
      <Navbar
        email={user.email}
        username={user.username}
        image={adminUserImage}
      />

      <section className="main_content">
        <AdminTitle title={"Borrow Management"} />
        <Filter
          defaultValue={"userid"}
          options={columns}
          ShouldDisplay={"none"}
          getSingleData={getSingleBorrowRecord}
          
        />
        <table style={style} className="data">
          <thead className="table_head_borrow">
            <tr className="column_borrow">
              {borrowRecord.length === 0 ? (
                <th>loading...</th>
              ) : (
                <ColumnTitle data={borrowRecord} columnStyle={"borrow"} />
              )}
            </tr>
          </thead>
          <tbody className="table_body_borrow">
            {borrowRecord.length === 0 ? (
              <tr>
                <td style={{textAlign:"center"}}>no data...</td>
              </tr>
            ) : (
              <DataList
                columnStyle={"borrow"}
                buttonStyle={"none"}
                page={pageNumber}
                data={borrowRecord}
              />
            )}
            <ControlPageBtn
          add={addPageNumber(borrowRecord, pageNumber, setPageNumber)}
          reduce={reducePageNumber(pageNumber, setPageNumber)}
          buttonStyle={buttonStyle}
        />
          </tbody>
          
        </table>
        
      </section>
    </div>
  );
}

export default BorrowRecordManagement;
