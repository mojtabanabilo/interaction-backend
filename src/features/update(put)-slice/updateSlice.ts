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

const updateData = createAsyncThunk(
  "update(put)-slice/fetch-put",
  async (api: { api: string; data: any }) => {
    return axios
      .put(
        api.api,
        api.data,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("access-token-login"),
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          notify(`${res.data}`, "success");
          return res;
        }
      })
      .catch((err) => {
        if (err.status >= 400) {
          notify(`${err.data}`, "error");
          return err;
        }
      });
  }
);

const updateSlice = createSlice({
  name: "update(put)-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";
    });
    builder.addCase(updateData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default updateSlice.reducer;
export { updateData };