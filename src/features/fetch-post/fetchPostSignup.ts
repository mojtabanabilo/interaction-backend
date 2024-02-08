import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISignupData, IinitialStateFetchPost } from "../../utils/types/interface";
import axios from "axios";

const initialState : IinitialStateFetchPost = {
    loading: false,
    data: [],
    errorMsg: ""
}

const postDataSignup = createAsyncThunk('fetchPostSignup/fetch-post', (data : ISignupData)  => {
    axios.post('http://localhost:4000/auth/register', data)
    .then(res => res)
    .catch(err => err)
})

const fetchPostSignup = createSlice({
    name: 'fetchPostSignup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postDataSignup.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(postDataSignup.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
            state.errorMsg = "";
        })
        builder.addCase(postDataSignup.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.errorMsg = action.error.message;
        })
    }
})

export default fetchPostSignup;
export { postDataSignup }