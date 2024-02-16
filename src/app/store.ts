import { configureStore } from "@reduxjs/toolkit";
import fetchPostData from "../features/fetch-post/fetchPost";
import fetchGetData from "../features/fetch-get/fetchGet";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

const store: any = configureStore({
  reducer: {
    postData: fetchPostData.reducer,
    getData: fetchGetData.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
