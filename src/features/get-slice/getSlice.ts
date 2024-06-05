import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IinitialStateFetch } from "../../utils/types/interface";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
const cookie = new Cookies();

const initialState: IinitialStateFetch = {
  loading: false,
  data: [],
  errorMsg: "",
};

const getData = createAsyncThunk(
  "get-slice/get-data",
  async (api: string) => {
    return axios
      .get(api, {
        headers: {
          Authorization: "Bearer " + cookie.get("access-token-login"),
        },
      })
      .then((res) => res)
      .catch((err) => err)
  }
);

const getSlice = createSlice({
  name: "get-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
      state.errorMsg = "";
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.errorMsg = action.error.message;
    });
  },
});

export default getSlice.reducer;
export { getData };
