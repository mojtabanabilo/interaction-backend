import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import spinner from "../../assets/Rolling-1s-31px.gif";
import {
  ISignupData,
  ISignupErrorValidation,
  ISignupTouch,
} from "../../utils/types/interface";
import { signUpValidation } from "../../utils/functions/functions";
import { post } from "../../utils/fetch API/fetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";
import { postData } from "../../features/fetch-post/fetchPost";
import Cookies from "universal-cookie";

export default function SignUp() {
  // cookie
  const cookies = new Cookies();

  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);

  // navigator
  const navigate = useNavigate();

  // toastify
  const notify = () => toast.error("Invalid Data !");

  // states
  const [signUpData, setSignUpData] = useState<ISignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signUpError, setSignUpError] = useState<ISignupErrorValidation>({});
  const [touch, setTouch] = useState<ISignupTouch>({
    firstNameTouch: false,
    lastNameTouch: false,
    emailTouch: false,
    passwordTouch: false,
  });
  const [data, setData] = useState<any>({});

  // lifecycle
  useEffect(() => {
    setSignUpError(signUpValidation(signUpData));
  }, [signUpData]);
  useEffect(() => {
    if (
      selector.postData.data[0] !== undefined &&
      selector.postData.data[0].data.statusCode === 201
    )
      navigate("/log-in");
    // console.log(selector);
  }, [selector]);

  return (
    <div className="w-full h-full flex justify-center items-canter">
      <div className="flex min-w-full min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={tailwindLogo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create new Account
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" action="#" method="POST">
            <div className="mt-2">
              <input
                id="firstname"
                name="firstName"
                type="text"
                required
                placeholder="first name"
                className="outline-none block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    [e.target.name]: e.target.value,
                  })
                }
                value={signUpData.firstName}
                onFocus={() => setTouch({ ...touch, firstNameTouch: true })}
              />
              {touch.firstNameTouch && (
                <span className="text-sm bg-red-200 text-red-800">
                  {signUpError.firstNameError}
                </span>
              )}
            </div>

            <div className="mt-2">
              <input
                id="lastname"
                name="lastName"
                type="text"
                required
                placeholder="last name"
                className="outline-none block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    [e.target.name]: e.target.value,
                  })
                }
                value={signUpData.lastName}
                onFocus={() => setTouch({ ...touch, lastNameTouch: true })}
              />
              {touch.lastNameTouch && (
                <span className="text-sm bg-red-200 text-red-800">
                  {signUpError.lastNameError}
                </span>
              )}
            </div>

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
                  setSignUpData({
                    ...signUpData,
                    [e.target.name]: e.target.value,
                  })
                }
                value={signUpData.email}
                onFocus={() => setTouch({ ...touch, emailTouch: true })}
              />
              {touch.emailTouch && (
                <span className="text-sm bg-red-200 text-red-800">
                  {signUpError.emailError}
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
                  setSignUpData({
                    ...signUpData,
                    [e.target.name]: e.target.value,
                  })
                }
                value={signUpData.password}
                onFocus={() => setTouch({ ...touch, passwordTouch: true })}
              />
              {touch.passwordTouch && (
                <span className="text-sm bg-red-200 text-red-800">
                  {signUpError.passwordError}
                </span>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  if (Object.keys(signUpError).length === 0) {
                    dispatch(
                      postData({
                        api: "http://localhost:4000/auth/register",
                        data: signUpData,
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
                  "Create account"
                )}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            do you have acoount?{" "}
            <Link
              to={"/log-in"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log-In
            </Link>
          </p>
        </div>
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
