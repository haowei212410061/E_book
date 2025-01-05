import React from "react";

function ColumnTitle({ data }) {

  const titles = Object.keys(data[0]).filter((item)=>item !== "__typename")
  return (
    <>
      {titles.map((item, index) => {
        return <th className={item} key={index}>{item}</th>;
      })}
    </>
  );
}

export default ColumnTitle;
