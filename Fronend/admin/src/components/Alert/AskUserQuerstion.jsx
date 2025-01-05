import React, { useState, useEffect } from "react";

function AskUserQuerstion({ action }) {
  const [secondes, setSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(true);
  const [isDisabled,setDisable] = useState(false)
  useEffect(() => {
    let SecondsTimer;
    if (isRunning) {
      SecondsTimer = setInterval(() => {
        setSeconds((prevSecond) => {
          if (prevSecond === 0) {
            setIsRunning(false);
            setDisable(true)
            return 5;
          } else {
            return prevSecond - 1;
          }
        });
      },1000);
    }
  },[isDisabled]);
  return (
    <div className="message">
        <i class="fa-solid fa-exclamation"></i>
        <h1>這筆資料將會被{action}</h1>
        <h3>你確定要{action}嗎</h3>
        <div className="buttons">
            <button disabled={isDisabled} className="sure">確定{secondes}</button>
            <button disabled={true} className="exit">取消</button>
        </div>
    </div>
  )
}

export default AskUserQuerstion;
