import { useState } from "react";
import { useForgotPasswordMutation } from "../service/authApi";
import { useNavigate, Link } from "react-router-dom";
import "../colors.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [forgotPassword] = useForgotPasswordMutation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      await forgotPassword({ email: trimmedEmail }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error sending reset email", error);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError && newEmail.trim()) {
      setEmailError("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center w-full">
        <form action="">
          <h1 className="text-2xl font-bold primary-text mb-5 text-center font-montserrat">
            Forgot Password
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Masukan email"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>
          <button
            className="primary text-white w-full font-normal text-sm h-[50px] mt-5 rounded-2xl"
            onClick={handleForgotPassword}
          >
            Send
          </button>
          <p className="text-sm text-center mt-3">
            <Link to="/" className="on-primary-text hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
