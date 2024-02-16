import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IinitialStateFetchGet } from "../../utils/types/interface";
import axios from "axios";

const initialState: IinitialStateFetchGet = {
    loading: false,
    data: [],
    errorMsg: ''
};

const getData = createAsyncThunk('fetchGetData/fetch-get', async() => {
    return axios.get('http://localhost:4000/user')
    .then(res => res)
    .catch(err => err)
})

const fetchGetData = createSlice({
  name: "fetchGetData",
  initialState,
  reducers: {},
  extraReducers: builder => {
      builder.addCase(getData.pending, state => {
        state.loading = true;
      });
      builder.addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.errorMsg = '';
      });
      builder.addCase(getData.rejected, (state ,action) => {
        state.loading = false;
        state.data = [],
        state.errorMsg = action.error.message;
      })
  },
});

export default fetchGetData
export { getData };
