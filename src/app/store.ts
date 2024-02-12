import { configureStore } from "@reduxjs/toolkit";
import fetchPostData from "../features/fetch-post/fetchPost";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

const store: any = configureStore({
  reducer: {
    postData: fetchPostData.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
