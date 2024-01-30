import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import mojtabaNabilu from "../../assets/photo_2024-01-09_05-32-18.jpg";
import github from "../../assets/github.jpg";

export default function Sidebar(props: {
  show: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> };
}) {
  return (
    <div className="absolute right-0 border-l-2 border-gray-300 p-2 w-full h-full xs:w-3/6 bg-gray-100 flex flex-col justify-start items-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        onClick={() => props.show.setOpen(false)}
        className="w-7 h-7 sm:hidden text-gray-400 hover:text-blue-500 transition cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
      <div className="w-full bg-gray-800 text-white p-4 mt-4 rounded">
        <h2 className="text-2xl font-bold mb-2">Pages</h2>
        <ul>
          <Link to={"/#"}>
            <li className="mb-1 mx-2 hover:text-blue-500 hover:font-semibold transition">
              Users
            </li>
          </Link>
          <Link to={"/sign-up"}>
            <li className="mb-1 mx-2 hover:text-blue-500 hover:font-semibold transition">
              Logout
            </li>
          </Link>
        </ul>
      </div>
      <div className="w-full p-4 bg-gray-400 mt-2 rounded">
        <h3 className="text-xl font-bold mb-2">Contact</h3>
        <ul className="font-medium">
          <Link to={'https://github.com/AbolfazlGhaderi'} target="_blank">
            <li className="hover:text-white hover:font-semibold transition cursor-pointer">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-2"
                src={github}
                alt="profile"
              />
              Abolfazl Ghaderi
            </li>
          </Link>
          <Link to={'https://github.com/mojtabanabilo'} target="_blank">
            <li className="hover:text-white hover:font-semibold transition cursor-pointer">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-2"
                src={mojtabaNabilu}
                alt="profile"
              />
              Mojtaba Nabilu
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
