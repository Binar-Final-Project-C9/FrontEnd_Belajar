import Navbar from "./Navbar";
import appLogo from "../assets/Belajar_white 3.png";
import Class from "./Class";

const Sidebar = ({ children }) => {
  const Menus = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Kelola Kelas", path: "/course" },
    { title: "Keluar", path: "/login" },
  ];

  return (
    <>
      <div className="flex ">
        <div className="lg:flex flex-col hidden h-screen shadow w-60 bg-[#6148FF]">
          <div className="space-y-3">
            <div className="flex items-center ms-6">
              <img
                src={appLogo}
                alt=""
                style={{ width: "134.127px", height: "150px" }}
              />
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm font-semibold text-white">
                {Menus.map((menu, index) => (
                  <li key={index} className="hover:bg-[#489CFF]">
                    <a
                      href={menu.path}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md"
                    >
                      <span className="text-base font-semibold">
                        {menu.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full container mx-auto">
          <Navbar />
          <div className="container mx-auto w-full mt-12 lg:px-20 p-5">
            <Class />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
