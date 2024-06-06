import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IinitialStateFetch,
  IUserCodeFetchData,
} from "../../utils/types/interface";
import axios from "axios";
import { notify } from "../../utils/functions/functions";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const userCodeFetch = createAsyncThunk(
  "userCode/fetch-post",
  async (api: { api: string; data: IUserCodeFetchData }) => {
    return await axios
      .post(api.api, api.data)
      .then((res) => res)
      .catch((err) => err);
  }
);

const userCodeSlice = createSlice({
  name: "userCode-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userCodeFetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userCodeFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";

      // error notification
      try {
        if (action.payload && action.payload.response.status === 400) {
          notify(action.payload.response.data.message, "error");
        }
      } catch (error) {
        console.log(error);
        if (
          action.payload.data &&
          action.payload.data.statusCode === 200 &&
          action.payload.data.AccessToken
        ) {
          cookies.set("access-token-login", action.payload?.data?.AccessToken, {
            expires: new Date(Date.now() + 259200000),
          });
        }
        window.location.assign("/");
      }
    });
    builder.addCase(userCodeFetch.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default userCodeSlice.reducer;
export { userCodeFetch };
