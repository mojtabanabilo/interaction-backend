import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISignupData, IinitialStateFetch } from "../../utils/types/interface";
import axios from "axios";

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const signupFetch = createAsyncThunk(
  "sign-up/fetch-post",
  async (api: { api: string; data: ISignupData }) => {
    return await axios
      .post(api.api, api.data)
      .then((res) => res)
      .catch((err) => {
        if (err) setTimeout(() => window.location.reload(), 3000);
        return err
      });
  }
);

const signupSlice = createSlice({
  name: "signup-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupFetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";
    });
    builder.addCase(signupFetch.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default signupSlice.reducer;
export { signupFetch };
