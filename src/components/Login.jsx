import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import appLogo from "../assets/appLogo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../service/authApi";
import { setToken } from "../slices/authSlice";
import { Link } from "react-router-dom";
import "../colors.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setToken(res));
      navigate("/");
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="lg:flex hidden items-center justify-center w-2/5 primary h-full">
        <img src={appLogo} alt="" className="w-[400px] h-[330px]" />
      </div>
      <div className="flex items-center justify-center w-3/5">
        <form action="" onSubmit={submitHandler}>
          <h1 className="text-2xl font-bold primary-text mb-5 text-center font-montserrat">
            Login
          </h1>
          <div className="mb-1">
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
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm mt-1 w-full p-2 ps-4 border lg:w-[500px] rounded-2xl"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="flex items-center mb-1 justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link to="/forgot-password">
              <label
                htmlFor="forgot-password"
                className={`block text-sm font-medium cursor-pointer primary-text`}
              >
                Lupa Kata Sandi
              </label>
            </Link>
          </div>
          <div className="flex flex-wrap relative rounded-2xl items-center">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="search"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-shrink flex-grow text-sm flex-1 w-full p-2 ps-4 border rounded-2xl"
                placeholder="Masukkan Password"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <button
            className="text-white w-full font-bold text-sm h-[50px] mt-5 rounded-2xl primary"
            type="submit"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
