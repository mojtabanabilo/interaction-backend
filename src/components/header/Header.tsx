import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imageTailWind from "../../assets/icons8-tailwind-css-96.png";
import { setStateResize } from "../../utils/functions/functions";
import Cookies from "universal-cookie";

// components
import Sidebar from "../sidebar/Sidebar";
import DropDownMenu from "../drop-down-menu/DropDownMenu";

// icon
import userProfile from "../../assets/userProfile.png";

export default function Header(): JSX.Element {
  // cookie
  const cookie = new Cookies();

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(0);

  // lifecycle
  useEffect(() => {
    setStateResize(setScreenSize);
  }, [screenSize]);

  return (
    <>
      <header className="w-full h-16 p-3 flex justify-between items-center border-b-2 border-blue-100 transition-opacity">
        <div className="flex justify-evenly items-center">
          <img
            src={imageTailWind}
            className="w-10 h-10 md:w-14 md:h-14"
            alt="tailwind"
            loading="lazy"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-400 mx-4">
            Panel
          </h1>
        </div>
        <div className="flex justify-center items-center [&>*]:ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={() => setOpen((pre) => !pre)}
            className="w-7 h-7 sm:hidden text-gray-400 hover:text-blue-500 transition cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <Link
            to={"/sign-up"}
            onClick={() => {
              cookie.remove("access-token-login");
            }}
            className="hover:text-blue-500 transition"
          >
            Logout
          </Link>
          <DropDownMenu />
          <div className="hidden sm:flex justify-center items-center space-x-1 overflow-hidden cursor-pointer">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src={userProfile}
              alt="user-profile"
              loading="lazy"
            />
          </div>
        </div>
      </header>
      {screenSize < 639 && open && <Sidebar show={{ open, setOpen }} />}
    </>
  );
}
