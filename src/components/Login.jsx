import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import appLogo from "../assets/Belajar_white 3.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/authApi";
import { setCredentials } from "../slices/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { authInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authInfo) {
      navigate("/dashboard");
    }
  }, [navigate, authInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
      navigate("/");
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center w-2/5 bg-dark-blue h-full">
        <img src={appLogo} alt="" className="w-[134px] h-[150px]" />
      </div>
      <div className="flex items-center justify-center w-3/5">
        <form action="" onSubmit={submitHandler}>
          <h1 className="text-2xl font-bold text-dark-blue mb-5 text-center font-montserrat">
            Login
          </h1>
          {error && <p className="text-red-500 text-center py-1">{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700">
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
          <div className="flex flex-wrap relative rounded-2xl items-center">
            <div className="relative w-full">
              <input
                type="password"
                id="search"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-shrink flex-grow text-sm flex-1 w-full p-2 ps-4 border rounded-2xl"
                placeholder="Masukkan Password"
                required
              />
              <div className="absolute top-1/2 transform -translate-y-1/2 right-6 cursor-pointer">
                <FaRegEye className="text-gray-600" />
              </div>
            </div>
          </div>
          <button
            className="bg-dark-blue text-white w-full font-normal text-sm h-[50px] mt-5 rounded-2xl"
            type="submit">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
