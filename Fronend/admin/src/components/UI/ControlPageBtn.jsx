import React from "react";
import { button } from "../../styles/components/AskUserStyle";

function ControlPageBtn({reduce,add,buttonStyle}) {
  return (
    <div style={buttonStyle} className="buttons">
      <button onClick={reduce} className="previous">
        <i className="fa-solid fa-circle-chevron-left"></i>上一頁
      </button>
      <button onClick={add} className="next">
        <i className="fa-solid fa-circle-chevron-right"></i>下一頁
      </button>
    </div>
  );
}

export default ControlPageBtn;
