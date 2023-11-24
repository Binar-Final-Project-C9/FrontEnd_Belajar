import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center w-2/5 bg-dark-blue h-full">
        belajar
      </div>
      <div className="flex items-center justify-center w-3/5">
        <form action="">
          <h1 className="text-2xl font-bold text-dark-blue mb-5 text-center">
            Login Admin
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
              className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
              placeholder="Text"
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
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <input
              type="text"
              id="password"
              className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
              placeholder="Text"
            />
          </div>
          <button
            className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl mt-5"
            type="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
