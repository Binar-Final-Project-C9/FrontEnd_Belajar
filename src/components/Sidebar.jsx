import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeToken } from "../slices/authSlice";
import {
  FaExclamationTriangle,
  FaTachometerAlt,
  FaChalkboard,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";
import appLogo from "../assets/appLogo.png";
import Navbar from "./Navbar";

const Sidebar = ({ children }) => {
  const Menus = [
    { title: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { title: "Kelola Kelas", path: "/course", icon: FaChalkboard },
    { title: "Kelola Pembayaran", path: "/user", icon: FaMoneyBill },
    { title: "Keluar", path: "/", icon: FaSignOutAlt },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const matchingMenu = Menus.find((menu) => menu.path === currentPath);
    if (matchingMenu) {
      setActiveMenu(matchingMenu.title);
    }
  }, []);

  const showModalLogoutHandler = async () => {
    try {
      setShowCloseModal(true);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  const logoutHandler = () => {
    dispatch(removeToken());
    navigate("/");
    setActiveMenu("");
  };

  return (
    <div className="flex">
      <div className="lg:flex flex-col hidden min-h-screen w-60 primary">
        <div className="space-y-3">
          <div className="flex items-center ms-6">
            <img src={appLogo} alt="" className="w-30 h-28 mt-5" />
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 text-xl font-bold on-tertiary-text">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className={`${
                    activeMenu === menu.title ? "bg-[#ccdcc3] shadow-md" : ""
                  } hover:bg-[#9ed67c] transition-all duration-300`}
                >
                  {menu.title === "Keluar" ? (
                    <button
                      onClick={() => {
                        setActiveMenu(menu.title);
                        showModalLogoutHandler();
                      }}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md cursor-pointer mt-12"
                    >
                      <span className="flex items-center text-sm font-bold font-montserrat">
                        <menu.icon className="text-base me-6" />
                        {menu.title}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={menu.path}
                      onClick={() => setActiveMenu(menu.title)}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <span className="flex items-center justify-between text-sm font-bold font-montserrat">
                        <menu.icon className="text-base me-6" />
                        {menu.title}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full container mx-auto">
        <Navbar />
        <div className="container mx-auto w-full mt-12 lg:px-20 p-5">
          {children}
        </div>
      </div>

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
  );
};

export default Sidebar;
