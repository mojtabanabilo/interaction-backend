import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageTailWind from "../../assets/icons8-tailwind-css-96.png";

export default function Header() {
  return (
    <header className="w-full h-16 p-3 flex justify-between items-center border-gray-100 border-b-2">
      <div className="flex justify-evenly items-center">
        <img
          src={imageTailWind}
          className="w-10 h-10 md:w-14 md:h-14"
          alt="tailwind"
        />
        <h1 className="text-xl md:text-2xl font-bold text-gray-400 mx-4">Panel</h1>
      </div>
      <ul className="flex justify-between items-center [&>*]:mx-2 text-base font-semibold text-gray-400 [&>*]:cursor-pointer">
        <li className="hover:text-blue-500 transition">SignUp</li>
        <li className="hover:text-blue-500 transition">Login</li>
      </ul>
    </header>
  );
}
