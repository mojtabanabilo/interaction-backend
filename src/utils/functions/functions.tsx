import { Dispatch, SetStateAction, useEffect } from "react";
import { Outlet, Navigate, useLocation, Route } from "react-router-dom";
import {
  ISignupErrorValidation,
  ISignupData,
  ILoginErrorValidation,
  ILoginData,
} from "../types/interface";
import Cookies from "universal-cookie";

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
  } else if(!codeRegex.test(data.code)) {
    objError.codeError = "Please type Number !";
  } else {
    delete objError.codeError;
  }

  return objError;
};

// PRIVATE ROUTE -------------------------------
export const PrivateRoutes : any = () => {
  const cookie = new Cookies();
  let cookieStatus = cookie.get('access-token-Login');
  return (
    cookieStatus !== undefined ? <Outlet /> : <Navigate to={'sign-up'}/>
  )
}
// PRIVATE ROUTE -------------------------------

// SET STATE RESIZE - SIDEBAR COMPONENT ------------------------------
export const setStateResize : Function = (setData : Dispatch<SetStateAction<number>>) : any => {
  const handleResizeWindow : any = () => setData(window.innerWidth);
  handleResizeWindow();
  window.addEventListener("resize", handleResizeWindow);
  return () => {
     window.removeEventListener("resize", handleResizeWindow);
  };
}
// SET STATE RESIZE FOR SIDEBAR COMPONENT ------------------------------