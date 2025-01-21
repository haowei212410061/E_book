import {
  GET_SINGLE_BORROW_RECORDS_WITH_ADMIN,
  GET_ALL_BORROW_RECORD_WITH_ADMIN,
} from "../Graphql api/query";
import { client } from "../main";
import { useDispatch } from "react-redux";
import { setBorrowRecord } from "../state/borrowRecord/borrowSlice";
import { useToast } from "./useToast";
export function useBorrowRecordAPI() {
  const dispatch = useDispatch();
  const { success,error } = useToast();
  const getAllBorrowRecord = async () => {
    try {
      const { data } = await client.query({
        query: GET_ALL_BORROW_RECORD_WITH_ADMIN,
      });
      dispatch(setBorrowRecord(data.BorrowRecords.data))
      return data.BorrowRecords.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleBorrowRecord = async (column, info) => {
    try {
      const { data } = await client.query({
        query: GET_SINGLE_BORROW_RECORDS_WITH_ADMIN,
        variables: {
          column: column,
          info: info,
        },
      });

      const res = data.SingleBorrowRecord.data;
      if (res.length === 0) {
        dispatch(setBorrowRecord([]));
        error("No data");
      }else{
        dispatch(setBorrowRecord(res))
        success(`搜索到${res.length}筆資料`);
        return data.SingleBorrowRecord.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { getAllBorrowRecord, getSingleBorrowRecord };
}
