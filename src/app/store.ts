import {
  EnhancedStore,
  configureStore,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import loginSlice from "../features/login-slice/loginSlice";
import getSlice from "../features/get-slice/getSlice";
import updateSlice from "../features/update(put)-slice/updateSlice";
import signupSlice from "../features/signup-slice/signupSlice";
import logger from "redux-logger";
import otpLoginSlice from "../features/otp-login/otpLoginSlice";
import userCodeSlice from "../features/userCode-slice/userCodeSlice";
import deleteSlice from "../features/delete-slice/deleteSlice";

const store: EnhancedStore<any> = configureStore({
  reducer: {
    loginFetch: loginSlice,
    signupFetch: signupSlice,
    otpLoginFetch: otpLoginSlice,
    userCodeFetch: userCodeSlice,
    getData: getSlice,
    updateData: updateSlice,
    deleteData: deleteSlice,
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
