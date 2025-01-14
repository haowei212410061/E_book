import React from "react";

function ColumnTitle({ data ,columnStyle }) {

  const titles = Object.keys(data[0]).filter((item)=>item !== "__typename")
  return (
    <>
      {titles.map((item, index,arr) => {
        return <th className={`${columnStyle}${index}`} key={index}>{item}</th>;
      })}
    </>
  );
}

export default ColumnTitle;
