import React, { useState } from "react";
import { Link } from "react-router-dom";
import imageTailWind from "../../assets/icons8-tailwind-css-96.png";

export default function Header() {
  return (
    <header className="w-full h-16 p-3 flex justify-between items-center border-gray-100 border-b-2">
      <div className="flex justify-evenly items-center">
        <img
          src={imageTailWind}
          className="w-14 h-14 sm:w-10 sm:h-10"
          alt="tailwind"
        />
        <h1 className="text-2xl sm:text-xl font-bold text-gray-400 mx-4">Panel</h1>
      </div>
      <ul className="flex justify-between items-center [&>*]:mx-2 text-base font-semibold text-gray-400 [&>*]:cursor-pointer">
        <li>SignUp</li>
        <li>Login</li>
      </ul>
    </header>
  );
}
