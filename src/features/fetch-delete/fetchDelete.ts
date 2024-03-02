import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IinitialStateFetch } from "../../utils/types/interface";
import { notify } from "../../utils/functions/functions"; 
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const deleteData = createAsyncThunk(
  "fetchDeleteData/fetch-delete",
  async (id: any) => {
    return axios
      .delete(`http://localhost:4000/user/${id}`, {
        headers: {
          Authorization: "Bearer " + cookies.get("access-token-login"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
            notify("User Removed !", "success");
            return res;
        }
      })
      .catch((err) => {
        if (err.response.status >= 400) {
            notify(`${err.message}`, "error");
            return err;
        }
      })
  }
);

const fetchDeleteData = createSlice({
  name: "fetchDeleteData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";
    });
    builder.addCase(deleteData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default fetchDeleteData;
export { deleteData };
