import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/functions/functions";
import { getData } from "../../features/get-slice/getSlice";
import { updateData } from "../../features/update(put)-slice/updateSlice";
import { INewUserData } from "../../utils/types/interface";
import { jwtDecode } from "jwt-decode";
import spinner from "../../assets/Rolling-1s-31px.gif";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// icon
import userProfile from "../../assets/userProfile.png";

export default function EditUser(): JSX.Element {
  // states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [newUserData, setNewUserData] = useState<INewUserData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  // redux-hooks
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.getData);
  const { data } = selector;

  // cookie
  const cookies = new Cookies();
  const decodedToken = jwtDecode<any>(cookies.get("access-token-login"));

  // navigator
  const navigate = useNavigate();

  // lifecycle
  useEffect(() => {
    dispatch(getData("http://localhost:4000/user/whoami"));
  }, []);
  useEffect(() => {
    selector && setCurrentUser(data[data.length - 1]);
  }, [selector]);

  return (
    <section className="w-9/12 bg-white p-5 rounded-2xl border-gray-200 border-4 border-opacity-60">
      <div className="flex p-2 overflow-hidden">
        <img
          className="inline-block h-24 w-24 rounded-full ring-2 ring-white"
          src={userProfile}
          alt="user-profile"
        />
      </div>
      <form>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            You must change your data.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  autoComplete="given-name"
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={currentUser?.data.firstName || ""}
                  onChange={(e) =>
                    setNewUserData({
                      ...newUserData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  autoComplete="family-name"
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={currentUser?.data.lastName || ""}
                  onChange={(e) =>
                    setNewUserData({
                      ...newUserData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-4">
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
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={currentUser?.data.email || ""}
                  onChange={(e) =>
                    setNewUserData({
                      ...newUserData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center [&>*]:mx-1 mt-5">
          <button
            type="submit"
            className="flex w-24 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 transition-colors border-indigo-600 border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateData({
                  api: `http://localhost:4000/user/${decodedToken.sub}`,
                  data: newUserData,
                })
              );
            }}
          >
            {selector?.loading ? (
              <img className="w-6 h-6" src={spinner} alt="loading..." />
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="submit"
            className="flex w-24 justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 hover:text-white transition-colors border-indigo-500 border-2 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-600"
            onClick={() => {
              cookies.remove("access-token-login");
              navigate("/sign-up", { replace: true });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
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
    </section>
  );
}
