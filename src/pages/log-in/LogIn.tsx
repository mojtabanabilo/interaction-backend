import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import spinner from "../../assets/Rolling-1s-31px.gif";
import {
  ILoginData,
  ILoginTouch,
  ILoginErrorValidation,
} from "../../utils/types/interface";
import { logInValidation } from "../../utils/functions/functions";
import { post } from "../../utils/fetch API/fetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";
import { postData } from "../../features/fetch-post/fetchPost";
import Cookies from "universal-cookie";

export default function LogIn() {
  // cookies
  const cookies = new Cookies();

  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);

  // navigator
  const navigate = useNavigate();

  //states
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });
  const [touch, setTouch] = useState<ILoginTouch>({
    emailTouch: false,
    passwordTouch: false,
  });
  const [loginErr, setLoginErr] = useState<ILoginErrorValidation>({});

  // lifecycle
  useEffect(() => {
    setLoginErr(logInValidation(loginData));
  }, [loginData]);
  useEffect(() => {
    if (
      selector.postData.data[0]?.status === 200 &&
      selector.postData.data[0].data.accessToken
    ) {
      cookies.set(
        "access-token-login",
        selector.postData.data[0].data.accessToken,
        { expires: new Date(Date.now() + 2592000) }
      );
      navigate("/", { replace: true });
    }
  }, [selector]);

  // toastify
  const notify = () => toast.error("Invalid Data !");

  return (
    <div className="flex min-w-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={tailwindLogo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log In to your account
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" action="#" method="POST">
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="email"
              className="outline-none block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  [e.target.name]: e.target.value,
                })
              }
              value={loginData.email}
              onFocus={() => setTouch({ ...touch, emailTouch: true })}
            />
            {touch.emailTouch && (
              <span className="text-sm bg-red-200 text-red-800">
                {loginErr.emailError}
              </span>
            )}
          </div>

          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="password"
              className="outline-none block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  [e.target.name]: e.target.value,
                })
              }
              value={loginData.password}
              onFocus={() => setTouch({ ...touch, passwordTouch: true })}
            />
            {touch.passwordTouch && (
              <span className="text-sm bg-red-200 text-red-800">
                {loginErr.passwordError}
              </span>
            )}
          </div>

          <div>
            <button
              // type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                if (Object.keys(loginErr).length === 0) {
                  // post(
                  //   "http://localhost:4000/auth/login",
                  //   loginData,
                  //   undefined,
                  //   setData
                  // );
                  dispatch(
                    postData({
                      api: "http://localhost:4000/auth/login",
                      data: loginData,
                    })
                  );
                } else {
                  notify();
                }
              }}
            >
              {selector.postData.loading ? (
                  <img className="w-6 h-6" src={spinner} alt="loading..." />
                ) : (
                  "Login"
                )}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          I don't remember the password.{" "}
          <Link
            to={"/otp-login"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            OTP Login !
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          i want a new account.{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign-Up
          </Link>
        </p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
