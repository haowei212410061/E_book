import React from "react";

function ReloadBtn({ reloadFn }) {
  return (
    <>
      <button
        onClick={()=>reloadFn()}
        className="reloadBtn"
      >
        <i className="fa-solid fa-rotate-right"></i>
      </button>
    </>
  );
}

export default ReloadBtn;
