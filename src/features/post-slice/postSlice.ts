import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ISignupData,
  IinitialStateFetch,
  ILoginData,
  IUserCodeFetchData,
} from "../../utils/types/interface";
import axios from "axios";

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const postData = createAsyncThunk(
  "post-slice/fetch-post",
  async (api: {
    api: string;
    data: ISignupData | ILoginData | IUserCodeFetchData | { email: string };
  }) => {
    return axios
      .post(api.api, api.data)
      .then((res) => res)
      .catch((err) => err)
  }
);

const postSlice = createSlice({
  name: "post-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";
    });
    builder.addCase(postData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default postSlice;
export { postData };
