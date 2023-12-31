import { useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaChalkboard,
  FaMoneyBill,
  FaSignOutAlt,
  FaRegBell,
  FaExclamationTriangle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../slices/authSlice";
import "../colors.module.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCloseModal, setShowCloseModal] = useState(false);

  const logoutHandler = () => {
    dispatch(removeToken());
    navigate("/");
  };

  const showModalLogoutHandler = async () => {
    try {
      event.preventDefault();
      setShowCloseModal(true);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between py-3 bg-[#f7f7f7] relative">
        <div className="container mx-auto lg:px-24 px-5 flex items-center justify-between gap-5">
          <BiMenu
            className="w-8 h-8 lg:hidden "
            onClick={() => setToggle(true)}
          />
          {toggle && (
            <>
              <motion.div
                animate={{ x: [-100, 0] }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 lg:hidden w-1/2 h-screen flex flex-col primary"
              >
                <BiX
                  className="w-8 h-8 lg:hidden relative top-5 left-5 text-secondary"
                  onClick={() => setToggle(false)}
                />
                <ul className="pt-8 pb-4 space-y-1 text-sm font-semibold text-secondary">
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href="/dashboard"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaTachometerAlt className="me-6" />
                      <span className="text-base font-semibold">Dashboard</span>
                    </a>
                  </li>
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href="/course"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaChalkboard className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola Kelas
                      </span>
                    </a>
                  </li>
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href="/user"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaMoneyBill className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola User
                      </span>
                    </a>
                  </li>
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href="/notification"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaRegBell className="me-6" />
                      <span className="text-base font-semibold">
                        Kelola Notifikasi
                      </span>
                    </a>
                  </li>
                  <li className="hover:secondary mt-11">
                    <a
                      href=""
                      onClick={() => showModalLogoutHandler()}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <FaSignOutAlt className="me-6" />
                      <span className="text-base font-semibold">Keluar</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
          <p className="text-lg font-bold mr-5 py-3 on-secondary-text">
            Hi Admin!
          </p>
          {/* <div className="flex flex-wrap relative rounded-2xl p-1.5 bg-white items-center">
              <input
                type="text"
                className="flex-shrink flex-grow h-8 leading-normal flex-1 border-0 w-full px-3 relative self-center text-sm outline-none"
                placeholder="Cari"
              />
              <div className="flex -mr-px">
                <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                  <BiSearchAlt className="w-7 h-7 primary rounded-lg p-1 text-white" />
                </span>
              </div>
            </div> */}

          {showCloseModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-md w-96">
                <div className="flex items-center justify-center mb-2">
                  <FaExclamationTriangle className="text-red-500 w-8 h-8" />
                </div>
                <p className="text-md font-medium text-center mb-10">
                  Apakah Anda yakin ingin Logout?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-500 text-white px-6 py-1 rounded-md transition-all duration-300 hover:bg-opacity-80"
                    onClick={logoutHandler}
                  >
                    Keluar
                  </button>
                  <button
                    className="border border-gray-300 px-6 rounded-md transition-all duration-300 hover:bg-gray-100"
                    onClick={() => setShowCloseModal(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
