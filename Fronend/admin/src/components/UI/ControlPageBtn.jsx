import React from "react";

function ControlPageBtn({reduce,add}) {
  return (
    <div className="buttons">
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
