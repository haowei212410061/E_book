import React from "react";

function ColumnTitle({ data }) {
  return (
    <>
      {data.map((item, index) => {
        return <th className={item} key={index}>{item}</th>;
      })}
    </>
  );
}

export default ColumnTitle;
