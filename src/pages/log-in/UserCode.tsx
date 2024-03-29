import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import spinner from "../../assets/Rolling-1s-31px.gif";
import { userCodeValidation, notify } from "../../utils/functions/functions";
import { IUserCodeFetchData } from "../../utils/types/interface";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";
import { postData } from "../../features/post-slice/postSlice";

export default function UserCode(): JSX.Element {
  // cookie
  const cookies = new Cookies();

  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state);
  const { data, loading } = selector.postData;

  // navigator
  const navigate = useNavigate();

  // params
  const { email } = useParams();

  //states
  const [userCode, setUserCode] = useState<IUserCodeFetchData>({
    code: "",
    email: "",
  });
  const [userCodeErr, setUserCodeErr] = useState<{ codeError?: string }>({});
  const [touch, setTouch] = useState<boolean>(false);

  // lifecycle
  useEffect(() => {
    if (
      data[data.length - 1]?.status === 200 &&
      data[data.length - 1]?.data.AccessToken
    ) {
      cookies.set(
        "access-token-login",
        data[data.length - 1]?.data.AccessToken,
        {
          expires: new Date(Date.now() + 259200000),
        }
      );
      navigate("/", { replace: true });
    }
  }, [selector]);
  useEffect(() => {
    setUserCodeErr(userCodeValidation(userCode));
  }, [userCode.code]);
  useEffect(() => {
    setUserCode({ ...userCode, email: email });
  }, [email]);

  return (
    <div className="flex min-w-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={tailwindLogo}
          alt="Your Company"
        />
        <h4 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter the code that has been sent to your email.
        </h4>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" action="#" method="POST">
          <div className="mt-2">
            <input
              id="code"
              name="code"
              type="text"
              required
              placeholder="code (OTP)"
              className="outline-none block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) =>
                setUserCode({ ...userCode, code: e.target.value })
              }
              value={userCode.code}
              onFocus={() => setTouch(true)}
            />
            {touch && (
              <span className="text-sm bg-red-200 text-red-800">
                {userCodeErr.codeError}
              </span>
            )}
          </div>

          <div>
            <button
              // type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                if (Object.keys(userCodeErr).length === 0) {
                  dispatch(
                    postData({
                      api: "http://localhost:4000/auth/OTP-login",
                      data: userCode,
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
                "Login"
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
