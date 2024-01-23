import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import { ILoginData } from "../../utils/types/interface";
import { post } from "../../utils/fetch API/fetch";

export default function LogIn() {
  //states 
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: ""
  });

  useEffect(() => {
    console.log(loginData);
    
  }, [loginData])

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
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setLoginData({...loginData, [e.target.name] : e.target.value})}
                value={loginData.email}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={'/forget-password'}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setLoginData({...loginData, [e.target.name] : e.target.value})}
                value={loginData.password}
              />
            </div>
          </div>

          <div>
            <button
              // type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => {
                e.preventDefault();
                post('https://jsonplaceholder.typicode.com/posts', loginData)
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
    </div>
  );
}
