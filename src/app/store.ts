import { configureStore } from "@reduxjs/toolkit";
import fetchPost from "../features/fetch-post/fetchPostSignup";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

const store: any = configureStore({
  reducer: {
    postData: fetchPost.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
