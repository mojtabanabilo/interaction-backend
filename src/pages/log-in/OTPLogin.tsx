import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import spinner from "../../assets/Rolling-1s-31px.gif";
import { otpLoginValidation, notify } from "../../utils/functions/functions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";
import { postData } from "../../features/post-slice/postSlice";

export default function OTPLogin(): JSX.Element {
  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);
  const { data, loading } = selector.postData;

  //navigator
  const navigate = useNavigate();

  //states
  const [loginData, setLoginData] = useState<{ email: string }>({
    email: "",
  });
  const [loginErr, setLoginErr] = useState<{ emailError?: string }>({});
  const [touch, setTouch] = useState<boolean>(false);

  // lifecycle
  useEffect(() => {
    setLoginErr(otpLoginValidation(loginData));
  }, [loginData]);
  useEffect(() => {
    if (data[data.length - 1]?.status === 200)
      navigate(`/user-code/${data[data.length - 1].data.email}`, {
        replace: true,
      });
  }, [selector]);

  return (
    <div className="flex min-w-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={tailwindLogo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          One Time Password
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
              onFocus={() => setTouch(true)}
            />
            {touch === true && (
              <span className="text-sm bg-red-200 text-red-800">
                {loginErr.emailError}
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
                  dispatch(
                    postData({
                      api: "http://localhost:4000/auth/OTP-login",
                      data: loginData,
                    })
                  );
                } else {
                  notify("Invalid Data !", "error");
                }
              }}
            >
              {loading ? (
                <img className="w-6 h-6" src={spinner} alt="loading..." />
              ) : (
                "Send Code"
              )}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
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
