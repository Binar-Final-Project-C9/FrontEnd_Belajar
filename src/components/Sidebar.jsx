import React, { useState } from "react";
import Navbar from "./Navbar";
import appLogo from "../assets/appLogo.png";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeToken } from "../slices/authSlice";
import colors from "../colors.module.css";

const Sidebar = ({ children }) => {
  const Menus = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Kelola Kelas", path: "/course" },
    { title: "Keluar", path: "/" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("");

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
            <img src={appLogo} alt="" className="w-30 h-28" />
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 text-sm font-semibold on-tertiary-text">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className={`${
                    activeMenu === menu.title ? "bg-[#9ed67c] rounded-md" : ""
                  } hover:bg-[#9ed67c] transition-all duration-300`}
                >
                  {menu.title === "Keluar" ? (
                    <button
                      onClick={() => {
                        setActiveMenu(menu.title);
                        logoutHandler();
                      }}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md cursor-pointer"
                    >
                      <span className="text-base font-semibold">
                        {menu.title}
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={menu.path}
                      onClick={() => setActiveMenu(menu.title)}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <span className="text-base font-semibold">
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
    </div>
  );
};

export default Sidebar;
