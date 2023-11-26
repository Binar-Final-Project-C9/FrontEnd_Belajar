import { Link, useNavigate } from "react-router-dom";
import appLogo from "../assets/Belajar_white 3.png";
import { useState } from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center w-2/5 bg-dark-blue h-full">
        <img
          src={appLogo}
          alt=""
          style={{ width: "134.127px", height: "150px" }}
        />
      </div>
      <div className="flex items-center justify-center w-3/5">
        <form action="">
          <h1 className="text-2xl font-bold text-dark-blue mb-5 text-center font-montserrat">
            Login
          </h1>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Lupa Kata Sandi
                </a>
              </div>
            </div>
            <input
              type="text"
              id="password"
              className="text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl"
              placeholder="Masukkan Password"
            />
          </div>
          <Link to="/dashboard">
            <button
              href="/dashboard"
              className="bg-dark-blue text-white w-full font-normal text-sm h-[50px] mt-5 rounded-2xl"
              type="button">
              Masuk
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
