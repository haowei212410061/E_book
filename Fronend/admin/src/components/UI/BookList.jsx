import React from "react";
import { button } from "../../styles/components/AskUserStyle";
function BookList({data,page}) {
  return (
    <>
      {data.slice(page, page + 10).map((item, index) => {
        return (
          <tr key={index} className="info">
            <td className="bookId">{item.bookid}</td>
            <td className="bookName">{item.bookname}</td>
            <td className="bookAuthor">{item.bookauthor}</td>
            <td className="productionDate">{item.productiondate}</td>
            <td className="bookStatus">{item.bookstatus}</td>
            <td className="borrowCount">{item.borrowcount}</td>
            <td className="bookCategory">{item.bookcategory}</td>
            <td className="Image">
              <img
                style={{
                  display: "grid",
                  width: "30px",
                  height: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                src={item.bookimage}
                alt="img"
              />
            </td>
            <td >
            <button className="deleteBtn">刪除</button>
              </td>
          </tr>
          
        );
      })}
    </>
  );
}

export default BookList;
