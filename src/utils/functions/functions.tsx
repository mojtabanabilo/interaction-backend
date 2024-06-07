import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  ISignupErrorValidation,
  ISignupData,
  ILoginErrorValidation,
  ILoginData,
  INewUserData,
} from "../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppThunkDispatch } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

// REDUX HOOKS ----------------------------
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
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

export const editUserValidation: Function = (
  data: INewUserData,
  currentUser: any
) => {
  const wordsRegex: RegExp = /^[a-z ,.'-]+$/i;
  const emailRegex: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const objError: any = {};

  if (!data.firstName) {
    objError.firstNameError = "Firstname is Empty !";
  } else if (data.firstName === currentUser.firstName) {
    objError.firstNameError = "ّّPlease change your Firstname";
  } else if (!wordsRegex.test(data.firstName)) {
    objError.firstNameError = "Just use words !";
  } else {
    delete objError.firstNameError;
  }

  if (!data.lastName) {
    objError.lastNameError = "Lastname is Empty !";
  } else if (data.lastName === currentUser.lastName) {
    objError.lastNameError = "Please change your Lastname";
  } else if (!wordsRegex.test(data.lastName)) {
    objError.lastNameError = "Just use words !";
  } else {
    delete objError.lastNameError;
  }

  if (!data.email) {
    objError.emailError = "Email is Empty !";
  } else if (data.email === currentUser.email) {
    objError.emailError = "ّّPlease change your Email";
  } else if (!emailRegex.test(data.email)) {
    objError.emailError = "The Email Entered is Incorrect !";
  } else {
    delete objError.emailError;
  }
  console.log(objError);

  return objError;
};

// PRIVATE ROUTE -------------------------------
export const AuthenticationMiddleware: any = () => {
  const cookies = new Cookies();
  const currentCookie = cookies.get("access-token-login");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCookie === undefined) {
      navigate("/sign-up");
    } else {
      try {
        const decodedToken = jwtDecode<any>(currentCookie);
        const { email } = decodedToken;
        if (decodedToken.role === "Admin") navigate("/panel");
        else navigate(`/edit-user/${email}`);
      } catch (error) {
        navigate("/sign-up");
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
export const notify: Function = (text: string, typeToast: string) => {
  if (typeToast === "success") toast.success(text);
  else if (typeToast === "error") toast.error(text);
};
// toastify
