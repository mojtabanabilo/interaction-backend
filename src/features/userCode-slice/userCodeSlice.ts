import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IinitialStateFetch, IUserCodeFetchData } from "../../utils/types/interface";
import axios from "axios";

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const userCodeFetch = createAsyncThunk(
  "user-code/fetch-post",
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
