import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISignupData, IinitialStateFetch } from "../../utils/types/interface";
import axios from "axios";
import { notify } from "../../utils/functions/functions";

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const signupFetch = createAsyncThunk(
  "signup/fetch-post",
  async (api: { api: string; data: ISignupData }) => {
    return await axios
      .post(api.api, api.data)
      .then((res) => res)
      .catch((err) => {
        if (err) setTimeout(() => window.location.reload(), 3000);
        return err;
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
      console.log(action.payload);

      // Redirect user to login page
      try {
        if (action.payload && action.payload.response.status === 400) {
          notify(action.payload.response.data.message, "error");
        }
      } catch (error) {
        console.log(error);
        window.location.assign("/log-in");
      }
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
