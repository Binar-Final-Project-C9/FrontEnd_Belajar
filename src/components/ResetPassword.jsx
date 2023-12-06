import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get("token");
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, []);

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password/${token}`,
        {
          password,
          confirmPassword,
        }
      );
      alert("Password reset successful");
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center w-full">
        <form action="">
          <h1 className="text-2xl font-bold text-dark-blue mb-5 text-center font-montserrat">
            Reset Password
          </h1>
          {error && <p className="text-red-500 text-center py-1">{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="button"
            onClick={handleResetPassword}
            className="bg-dark-blue text-white w-full font-normal text-sm h-[50px] mt-5 rounded-2xl">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
