import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IinitialStateFetch } from "../../utils/types/interface";
import axios from "axios";
import { notify } from "../../utils/functions/functions";

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const otpLoginFetch = createAsyncThunk(
  "otp-slice/fetch-post",
  async (api: { api: string; data: { email: string } }) => {
    return await axios
      .post(api.api, api.data)
      .then((res) => res)
      .catch((err) => err);
  }
);

const otpLoginSlice = createSlice({
  name: "otp-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(otpLoginFetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(otpLoginFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";

      // error notification
      try {
        if (action.payload && action.payload.response.status === 404) {
          notify(action.payload.response.data.message, "error");
        }
      } catch (error) {
        console.log(error);
        localStorage.setItem(
          "user-email",
          JSON.stringify(action.payload?.data?.email)
        );
      }
    });
    builder.addCase(otpLoginFetch.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default otpLoginSlice.reducer;
export { otpLoginFetch };
