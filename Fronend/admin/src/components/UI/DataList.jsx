import React from "react";
import { button } from "../../styles/components/AskUserStyle";
function DataList({ data, page, deleteFunc, openEditWindow, buttonStyle,columnStyle }) {
  const ObjKey = Object.keys(data[0]).filter((item) => item !== "__typename");
  return (
    <>
      {data.slice(page, page + 10).map((item, index, arr) => {
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
              } else {
                return <td key={index} className={`${columnStyle}${index}`}>{item[column]}</td>;
              }
            })}

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
          </tr>
        );
      })}
    </>
  );
}

export default DataList;
