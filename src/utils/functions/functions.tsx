import { Outlet, useNavigate, Navigate, Route, Routes } from "react-router-dom";
import { Dispatch, SetStateAction, Suspense, lazy, useEffect } from "react";
import {
  ISignupErrorValidation,
  ISignupData,
  ILoginErrorValidation,
  ILoginData,
} from "../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

// pages
const Panel: any = lazy(() => import("../../pages/panel/Panel"));
const EditUser: any = lazy(() => import("../../pages/edit-user/EditUser"));

// components
import SuspenseLoading from "../../components/suspense-loading/SuspenseLoading";
import SignUp from "../../pages/sign-up/SignUp";

// REDUX HOOKS ----------------------------
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// REDUX HOOKS ----------------------------

export const signUpValidation: Function = (
  data: ISignupData
): ISignupErrorValidation => {
  const nameRegex: RegExp = /^[\u0000-\uFFFF -]+$/;
  const emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const objError: ISignupErrorValidation = {};

  if (!data.firstName) {
    objError.firstNameError = "First name is Empty !";
  } else if (!nameRegex.test(data.firstName)) {
    objError.firstNameError = "Invalid First name !";
  } else {
    delete objError.firstNameError;
  }

  if (!data.lastName) {
    objError.lastNameError = "Last name is Empty !";
  } else if (!nameRegex.test(data.lastName)) {
    objError.lastNameError = "Invalid Last name !";
  } else {
    delete objError.lastNameError;
  }

  if (!data.email?.trim()) {
    objError.emailError = "Email is Empty !";
  } else if (!emailRegex.test(data.email)) {
    objError.emailError = "Invalid Email !";
  } else {
    delete objError.emailError;
  }

  if (!data.password) {
    objError.passwordError = "Password is Empty !";
  } else if (data.password.length < 6) {
    objError.passwordError = "Password must be more than 6 digits";
  } else {
    delete objError.passwordError;
  }

  return objError;
};

export const logInValidation: Function = (
  data: ILoginData
): ILoginErrorValidation => {
  const emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const objError: any = {};

  if (!data.email?.trim()) {
    objError.emailError = "Email is Empty !";
  } else if (!emailRegex.test(data.email)) {
    objError.emailError = "The Email Entered is Incorrect !";
  } else {
    delete objError.emailError;
  }

  if (!data.password) {
    objError.passwordError = "Password is Empty !";
  } else if (data.password.length < 6) {
    objError.passwordError = "Password must be more than 6 digits";
  } else {
    delete objError.passwordError;
  }

  return objError;
};

export const otpLoginValidation: Function = (data: {
  email: string;
}): { emailError?: string } => {
  const emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const objError: any = {};

  if (!data.email?.trim()) {
    objError.emailError = "Email is Empty !";
  } else if (!emailRegex.test(data.email)) {
    objError.emailError = "The Email Entered is Incorrect !";
  } else {
    delete objError.emailError;
  }

  return objError;
};

export const userCodeValidation: Function = (data: {
  code: string;
}): { codeError: string } => {
  const codeRegex = /^\d+$/;
  const objError: any = {};

  if (!data.code) {
    objError.codeError = "Code is Empty !";
  } else if (!codeRegex.test(data.code)) {
    objError.codeError = "Please type Number !";
  } else {
    delete objError.codeError;
  }

  return objError;
};

// PRIVATE ROUTE -------------------------------
export const AuthenticationMiddleware: any = () => {
  const cookies = new Cookies();
  const currentCookie = cookies.get("access-token-login");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCookie === undefined) {
      navigate('/sign-up');
    } else {
      try {
        const decodedToken = jwtDecode<any>(currentCookie);
        if (decodedToken.role === 'Admin') {
          navigate('/panel');
        } else {
          navigate('/edit-user');
        }
      } catch (error) {
        navigate('/sign-up');
      }
    }
  }, [currentCookie, navigate]);
};
// PRIVATE ROUTE -------------------------------

// SET STATE RESIZE - SIDEBAR COMPONENT ------------------------------
export const setStateResize: Function = (
  setData: Dispatch<SetStateAction<number>>
): any => {
  const handleResizeWindow: any = () => setData(window.innerWidth);
  handleResizeWindow();
  window.addEventListener("resize", handleResizeWindow);
  return () => {
    window.removeEventListener("resize", handleResizeWindow);
  };
};
// SET STATE RESIZE FOR SIDEBAR COMPONENT ------------------------------

// toastify
export const notify = (text: string, typeToast: string) => {
  if (typeToast === "success") toast.success(text);
  else if (typeToast === "error") toast.error(text);
};
// toastify
