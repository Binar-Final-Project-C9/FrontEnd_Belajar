import { useState } from 'react';
import { BiSearchAlt, BiMenu, BiX } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { removeToken } from '../slices/authSlice';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(removeToken());
    navigate('/');
  };

  return (
    <>
      <nav className="flex items-center justify-between py-3 bg-[#EBF3FC] relative">
        <div className="container mx-auto lg:px-24 px-5 flex items-center justify-between gap-5">
          <BiMenu
            className="w-10 h-10 lg:hidden "
            onClick={() => setToggle(true)}
          />
          {toggle && (
            <>
              <motion.div
                animate={{ x: [-100, 0] }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-10 lg:hidden w-1/2 h-screen flex flex-col bg-[#6148FF]">
                <BiX
                  className="w-10 h-10 lg:hidden relative top-5 left-4"
                  onClick={() => setToggle(false)}
                />
                <ul className="pt-4 pb-4 space-y-1 text-sm font-semibold text-white">
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href="/dashboard"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md">
                      <span className="text-base font-semibold">Dashboard</span>
                    </a>
                  </li>
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href="/course"
                      className="flex items-center px-8 py-2 space-x-3 rounded-md">
                      <span className="text-base font-semibold">
                        Kelola Kelas
                      </span>
                    </a>
                  </li>
                  <li className="hover:bg-[#489CFF]">
                    <a
                      href=""
                      onClick={logoutHandler}
                      className="flex items-center px-8 py-2 space-x-3 rounded-md">
                      <span className="text-base font-semibold">Keluar</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
          <p className="text-lg font-bold text-dark-blue mr-5">Hi Admin!</p>
          <div className="flex flex-wrap relative rounded-2xl p-1.5 bg-white items-center">
            <input
              type="text"
              className="flex-shrink flex-grow h-8 leading-normal flex-1 border-0 w-full px-3 relative self-center text-sm outline-none"
              placeholder="Cari"
            />
            <div className="flex -mr-px">
              <span className="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600">
                <BiSearchAlt className="w-7 h-7 bg-dark-blue rounded-lg p-1 text-white" />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
