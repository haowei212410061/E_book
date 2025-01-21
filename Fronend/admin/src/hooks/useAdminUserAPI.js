import {
  CREATE_ADMIN_USER,
  DELETE_ADMIN_USER,
  UPDATE_ADMIN_USER_EMAIL,
  UPDATE_ADMIN_USER_PASSWORD,
} from "../Graphql api/mutation";
import {
  GET_ALL_ADMIN_USER,
  GET_SINGLE_ADMIN_USER,
} from "../Graphql api/query";
import { client } from "../main";
import { useDispatch } from "react-redux";
import { setAdminUser } from "../state/adminUser/adminSlice";
import { useToast } from "./useToast";
import { setUsers } from "../state/user/userSlice";
export function useAdminUserAPI() {
  const dispatch = useDispatch();
  const { success, error } = useToast();
  const getAllAdminUser = async () => {
    try {
      const { data } = await client.query({
        query: GET_ALL_ADMIN_USER,
      });
      dispatch(setUsers(data.AdminUsers.data))
      return data.AdminUsers.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleAdminUser = async (column, info) => {
    try {
      const { data } = await client.query({
        query: GET_SINGLE_ADMIN_USER,
        variables: {
          column: column,
          info: info,
        },
      });
      const res = data.SingleAdminUser.data;
      if (res.length === 0) {
        dispatch(setAdminUser([]));
        error("no data");
      } else {
        console.log(res);
        dispatch(setAdminUser(res));
        success(`已搜尋到${res.length}筆資料`);
        return res;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmail = async (adminid, email) => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_ADMIN_USER_EMAIL,
        variables: {
          adminid: adminid,
          newEmail: email,
        },
      });
      return data.updateAdminUserEmail.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePassword = async (adminid, password) => {
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_ADMIN_USER_PASSWORD,
        variables: {
          adminid: adminid,
          newPassword: password,
        },
      });
      return data.updateAdminUserPassword.data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAdminUser = async (adminid) => {
    try {
      const { data } = await client.mutate({
        mutation: DELETE_ADMIN_USER,
        variables: {
          adminid: adminid,
        },
      });
      return data.deleteAdminUser.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createAdminUser = async (admin) => {
    try {
      const { adminid, username, password, email } = admin;
      const { data } = await client.mutate({
        mutation: CREATE_ADMIN_USER,
        variables: {
          adminid: adminid,
          username: username,
          password: password,
          email: email,
        },
      });
      const newAdmin = data.createAdminUser.data
      const old = await getAllAdminUser();
      dispatch(setAdminUser([...newAdmin,...old]))
      return data.createAdminUser.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllAdminUser,
    getSingleAdminUser,
    updateEmail,
    updatePassword,
    deleteAdminUser,
    createAdminUser,
  };
}
