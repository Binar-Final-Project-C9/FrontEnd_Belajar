import { BiSearchAlt } from "react-icons/bi";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between py-3 bg-[#EBF3FC] relative">
        <div className="container mx-auto lg:px-24 px-5 flex items-center justify-between">
          <a className="text-lg font-bold text-dark-blue mr-5" href="">
            Hi Admin!
          </a>
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
