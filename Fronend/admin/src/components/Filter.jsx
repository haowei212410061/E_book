import React from "react";
import { useState } from "react";
import { useCommand } from "../hooks/useCommand";
import { useBookAPI } from "../hooks/useBookAPI";
function Filter({
  getSingleData,
  OpenCreateWindow,
  ShouldDisplay,
  options,
  defaultValue
}) {
  const [input, setInput] = useState("");
  const [column,setColumn] = useState(defaultValue)
  const {addEditChangeListener} = useCommand();
  
  return (
    <div className="filter">
      <div className="search_section">
        <p>Your data</p>
        <button
          className="search_btn"
          onClick={() =>{
            console.log(column,input)
            getSingleData(column, input)
          } }
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          type="text"
          className="search"
          placeholder="enter your data"
          onChange={(event) => addEditChangeListener(event,setInput)}
        ></input>
      </div>

      <div className="column">
        <p>column</p>
        <select
          name="book_column"
          id="book_column"
          onChange={(event) => addEditChangeListener(event,setColumn)}
        >
          <option value="" disabled >
            --請選擇以下欄位--
          </option>
          {
            options.map((item,index,arr)=>{
              return <option key={index} value={item}>{item.toUpperCase()}</option>
            })
          }
        </select>
      </div>
      <button style={{display:ShouldDisplay}} className="createBtn" onClick={(event)=>OpenCreateWindow("grid",event)}>創建</button>
    </div>
  );
}

export default Filter;
