import { EnhancedStore, configureStore, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import postSlice from "../features/post-slice/postSlice";
import getSlice from "../features/get-slice/getSlice";
import updateSlice from "../features/update(put)-slice/updateSlice";
import logger from "redux-logger";

const store: EnhancedStore<any> = configureStore({
  reducer: {
    postData: postSlice.reducer,
    getData: getSlice.reducer,
    updateData: updateSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>;
