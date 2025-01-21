import React from "react";
import { useState } from "react";
import { useCommand } from "../../hooks/useCommand";
import { button } from "../../styles/components/AskUserStyle";
function DataList({
  database,
  data,
  page,
  deleteFunc,
  openEditWindow,
  buttonStyle,
  columnStyle,
}) {
  const { getUserLocalStorage } = useCommand();
  const ObjKey = Object.keys(data[0]).filter((item) => item !== "__typename");
  const user = getUserLocalStorage();
  return (
    <>
      {data.slice(page, page + 10).map((item, index, arr) => {
        const isDisable = item.username !== user.username;
        return (
          <tr key={index} className={`${columnStyle}info`}>
            {ObjKey.map((column, index, arr) => {
              if (column.includes("image")) {
                return (
                  <td className="column7" key={"7"}>
                    <img
                      style={{
                        display: "grid",
                        width: "30px",
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      src={item[column]}
                      alt="img"
                    />
                  </td>
                );
              }else if(column === 'password'){
                const star = "*"
                return (
                  <td key={index} className={`${columnStyle}${index}`}>
                    {star.repeat(8)}
                  </td>
                );
              } 
              else {
                return (
                  <td key={index} className={`${columnStyle}${index}`}>
                    {item[column]}
                  </td>
                );
              }
            })}
            {database === "book" ? (
              <td className="listbuttons">
                <button
                  style={{ display: buttonStyle }}
                  onClick={() => deleteFunc(item.bookid)}
                  className="deleteBtn"
                >
                  刪除
                </button>
                <button
                  style={{ display: buttonStyle }}
                  onClick={(event) => openEditWindow("grid", event)}
                  id={item.bookid}
                  className="editBtn"
                >
                  編輯
                </button>
              </td>
            ) : (
              <td className="listbuttons">
                <button
                  disabled={isDisable}
                  style={{ display: buttonStyle }}
                  onClick={() => deleteFunc(item.adminid)}
                  className={isDisable ? "disable" : "deleteBtn"}
                >
                  刪除
                </button>
                <button
                  disabled={isDisable}
                  style={{ display: buttonStyle }}
                  onClick={(event) => openEditWindow("block",event)}
                  id={item.adminid}
                  className={isDisable ? "disable" : "editPassword"}
                >
                  重設密碼
                </button>
                <button
                  disabled={isDisable}
                  style={{ display: buttonStyle }}
                  onClick={(event) => openEditWindow("block",event)}
                  id={item.adminid}
                  className={isDisable ? "disable" : "editEmail"}
                >
                  重設郵件
                </button>
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
}

export default DataList;
