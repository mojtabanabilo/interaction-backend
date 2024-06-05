import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IinitialStateFetch,
  ILoginData
} from "../../utils/types/interface";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const loginFetch = createAsyncThunk(
  "login-slice/fetch-post",
  async (api: {
    api: string;
    data: ILoginData;
  }) => {
    return await axios
      .post(api.api, api.data)
      .then((res) => {
        const decodedToken = jwtDecode<any>(res.data.accessToken);
        cookie.set("access-token-login", res.data.accessToken, {
          expires: new Date(decodedToken.exp * 1000),
          path: "/",
        });
        return res;
      })
      .catch((err) => err);
  }
);

const loginSlice = createSlice({
  name: "log-in-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginFetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginFetch.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";
      console.log(action.payload);

      // set user Cookie ------------------------
      const decodedToken = jwtDecode<any>(action.payload.data.accessToken);
      if (
        (action.payload.data &&
          action.payload.data.accessToken &&
          action.payload.status == 200) ||
        201 ||
        202
      ) {
        cookie.set("access-token-login", action.payload.data.accessToken, {
          expires: new Date(decodedToken.exp * 1000),
          path: "/",
        });
        location.assign("/");
      }
    });
    builder.addCase(loginFetch.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default loginSlice.reducer;
export { loginFetch };
