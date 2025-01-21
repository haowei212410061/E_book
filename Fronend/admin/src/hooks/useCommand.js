import { parse } from "json2csv/dist/json2csv.umd.js";
import { saveAs } from "file-saver";
import { nanoid } from "@reduxjs/toolkit";
import { useToast } from "./useToast";
export function useCommand() {
  const {  success } = useToast();
  const addEditChangeListener = (event, stateFunc) => {
    const userInput = event.target.value;
    const input = userInput.trim();
    stateFunc(input);
  };

  const addPageNumber = (arr, PageState, PageStateFunc) => {
    const newCount = PageState + 10;
    if (newCount < arr.length) {
      PageStateFunc(newCount);
    }
  };

  const reducePageNumber = (PageState, PageStateFunc) => {
    const newCount = PageState - 10;
    if (newCount >= 0) {
      PageStateFunc(newCount);
    }
  };
  const getUserLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("UserLogin"));
    return { username: user.username, email: user.email };
  };

  const JsonToCsv = (data, fields,title) => {
    const date = new Date().toISOString().split("T")[0];
    const csvContent = parse(data, { fields });

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=UTF-8;",
    });
    saveAs(blob, `${title}_${date}_${nanoid().slice(0, 5)}.csv`);
    success("已成功下載報表");
  };
  return {
    addEditChangeListener,
    addPageNumber,
    reducePageNumber,
    getUserLocalStorage,
    JsonToCsv
  };
}
