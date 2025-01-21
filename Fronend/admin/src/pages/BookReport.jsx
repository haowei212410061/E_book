import React from "react";
import Navbar from "../components/Navbar";
import { useCommand } from "../hooks/useCommand";
import { useToast } from "../hooks/useToast";
import { useCheckVaild } from "../hooks/useCheckVaild";
import { useBookAPI } from "../hooks/useBookAPI";
import adminUserImage from "../assets/Admin.png";
import AdminTitle from "../components/UI/AdminTitle";

import { useState } from "react";

function BookReport() {
  const { getBookWithDate } = useBookAPI();
  const { getUserLocalStorage, addEditChangeListener ,JsonToCsv} = useCommand();
  const { checkDate } = useCheckVaild();
  const [start, setStart] = useState("2025-01-01");
  const [end, setEnd] = useState("2025-01-02");
  const user = getUserLocalStorage();
  const { warning} = useToast();

  const fetchDataAndDownloadCSV = async (title,event) => {
    event.preventDefault();
    if (!checkDate(start, end)) {
      warning("起始日期不可大於結束日期");
      return;
    } else {
      try {
        const response = await getBookWithDate(start, end);
        const fields = Object.keys(response[0]).filter(
          (item) => item !== "__typename"
        );
        JsonToCsv(response,fields,title)
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
        <AdminTitle title={"Book Report"} />
        <form className="BookReport">
          <input
            type="date"
            id="start"
            name="start"
            className="start"
            defaultValue={"2025-01-01"}
            onChange={(event) => addEditChangeListener(event, setStart)}
          />
          <p className="range">~</p>
          <input
            onChange={(event) => addEditChangeListener(event, setEnd)}
            type="date"
            id="end"
            name="end"
            className="end"
            defaultValue={"2025-01-02"}
          />
          <div className="export">
            <button
              onClick={(event) => fetchDataAndDownloadCSV("BookReport",event)}
              className="export"
              style={{ display: "flex", gap: "8px" }}
            >
              <i className="fa-solid fa-download"></i>Export
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BookReport;
