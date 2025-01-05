import React from "react";
import { useState } from "react";

function Filter({getSingleBookFunc,editChangeListener,selectFunc,column,info}) {

  return (
    <div className="filter">
      <div className="search_section">
        <p>Your data</p>
        <button className="search_btn" onClick={() => getSingleBookFunc(column,info)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          className="search"
          placeholder="enter your data"
          onChange={(event) => editChangeListener(event)}
        ></input>
      </div>

      <div className="column">
        <p>column</p>
        <select
          name="book_column"
          id="book_column"
          onChange={(event) => selectFunc(event)}
        >
          <option value="" disabled defaultChecked>
            --請選擇以下欄位--
          </option>
          <option value="bookname">BookName</option>
          <option value="bookauthor">bookAuthor</option>
          <option value="bookstatus">bookStatus</option>
          <option value="borrowcount">borrowCount</option>
          <option value="bookcategory">bookCategory</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
