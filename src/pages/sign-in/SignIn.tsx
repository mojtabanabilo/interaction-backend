import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tailwindLogo from "../../assets/icons8-tailwind-css-96.png";
import { ISigninData } from "../../utils/types/interface";
import { post } from "../../utils/fetch API/fetch";

export default function SignIn() {
  // states
  const [signInData, setSignInData] = useState<ISigninData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(signInData);
    
  }, [signInData])

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
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" action="#" method="POST">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Firstname
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstName"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setSignInData({...signInData, [e.target.name] : e.target.value})}
                  value={signInData.firstName}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Lastname
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastName"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setSignInData({...signInData, [e.target.name] : e.target.value})}
                  value={signInData.lastName}
                />
              </div>
            </div>

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
                  onChange={(e) => setSignInData({...signInData, [e.target.name] : e.target.value})}
                  value={signInData.email}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setSignInData({...signInData, [e.target.name] : e.target.value})}
                  value={signInData.password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  post('https://jsonplaceholder.typicode.com/posts', signInData)
                }}
              >
                Create account
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
    </div>
  );
}
