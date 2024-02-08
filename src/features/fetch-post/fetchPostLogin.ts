import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IinitialStateFetchPost } from "../../utils/types/interface"; }

const initialState : IinitialStateFetchPost = {
    loading: false,
    data: [],
    errorMsg: ""
}

// const postDataLogin = createAsyncThunk()

const fetchPostLogin = createSlice({
    name: 'fetchPostLogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})