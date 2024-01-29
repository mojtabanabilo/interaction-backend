import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import { userCodeValidation } from "../../utils/functions/functions";
import { IUserCodeFetchData } from "../../utils/types/interface";
import { post } from "../../utils/fetch API/fetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

export default function UserCode() {
  // cookie
  const cookies = new Cookies();

  // navigator
  const navigate = useNavigate();

  // params
  const { email } = useParams();  

  //states
  const [userCode, setUserCode] = useState<IUserCodeFetchData>({
    code: "",
    email: ""
  });
  const [data, setData] = useState<any>({})
  const [userCodeErr, setUserCodeErr] = useState<{ codeError?: string }>({});
  const [touch, setTouch] = useState<boolean>(false);

  // lifecycle
  useEffect(() => {
    console.log(data);
    if(data && data.status === 200){
      cookies.set("access-token-UserCode", data.data.AccessToken, {
        expires: new Date(Date.now() + 259200000),
      });
      navigate("/", { replace: true });
    }
  }, [data]);
  useEffect(() => {
    setUserCodeErr(userCodeValidation(userCode));
  }, [userCode.code]);
  useEffect(() => {
    setUserCode({...userCode, email: email})
  }, [email])

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
              onChange={(e) => setUserCode({ ...userCode, code: e.target.value })}
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
                  post("http://localhost:4000/auth/OTP-login", userCode, undefined, setData);
                } else {
                  notify();
                }
              }}
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          i want a new account.{" "}
          <Link
            to={"/sign-in"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign-In
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
