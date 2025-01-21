import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useCommand } from "../hooks/useCommand";
import { useToast } from "../hooks/useToast";
import { useCheckVaild } from "../hooks/useCheckVaild";
import { useBookAPI } from "../hooks/useBookAPI";
import adminUserImage from "../assets/Admin.png";
import AdminTitle from "../components/UI/AdminTitle";
import { client } from "../main";
import { GET_SINGLE_BORROW_RECORDS_WITH_ADMIN } from "../Graphql api/query";

function BorrowRecordReport() {
  const [input, setInput] = useState("");
  const [column, setColumn] = useState("userid");
  const { getUserLocalStorage, addEditChangeListener, JsonToCsv } =
    useCommand();
  const { checkPasswordLength } = useCheckVaild();
  const user = getUserLocalStorage();
  const { warning } = useToast();
  const columns = ["userid", "bookid"];

  const fetchDataAndDownloadCSV = async (title, event) => {
    event.preventDefault();
    if (!checkPasswordLength(input)) {
      warning("欄位不可為空");
      return;
    } else {
      try {
        const { data } = await client.query({
          query: GET_SINGLE_BORROW_RECORDS_WITH_ADMIN,
          variables: {
            column: column,
            info: input,
          },
        });

        const res = data.SingleBorrowRecord.data;
        if(res.length === 0){
            warning("資料為空")
            return
        }else{
            const fields = Object.keys(res[0]).filter(
                (item) => item !== "__typename"
              );
              JsonToCsv(res, fields, "BorrowReport");
        }
        
      } catch (error) {
        console.error("Error fetching data or generating CSV:", error);
      }
    }
  };

  return (
    <div className="admin_main_container">
      <Navbar
        username={user.username}
        email={user.email}
        image={adminUserImage}
      />

      <section className="main_content">
        <AdminTitle title={"Borrow Record Report"} />

        <div className="filter">
          <div className="search_section">
            <p>Your data</p>
            <input
              type="text"
              className="search"
              placeholder="enter your data"
              onChange={(event) => addEditChangeListener(event, setInput)}
            ></input>
          </div>

          <div className="column">
            <p>column</p>
            <select
              name="book_column"
              id="book_column"
              onChange={(event) => addEditChangeListener(event, setColumn)}
            >
              <option value="" disabled>
                --請選擇以下欄位--
              </option>
              {columns.map((item, index, arr) => {
                return (
                  <option key={index} value={item}>
                    {item.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="export" style={{ display: "flex", gap: "8px" }} onClick={(event)=>fetchDataAndDownloadCSV("BorrowReport",event)}>
            <i className="fa-solid fa-download"></i>Export
          </button>
        </div>
      </section>
    </div>
  );
}

export default BorrowRecordReport;
