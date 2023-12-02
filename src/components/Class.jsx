import { useState } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import Modal from "./Modal";
import Card from "./Card";

const Class = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Kelola Kelas
          </h2>
          <div className=" flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center bg-dark-blue rounded-full px-4 font-bold gap-2 py-[2px]"
              onClick={() => setShowModal(true)}
            >
              <FiPlusCircle />
              Tambah
            </button>
            <button className="flex items-center justify-center text-dark-blue border-dark-blue border-2 rounded-full px-4 font-bold gap-2">
              <FiFilter />
              Filter
            </button>
            <MdOutlineSearch className="w-7 h-7 text-dark-blue" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-[#EBF3FC] text-left text-sm font-normal">
              <tr className="h-12">
                <th className="ps-3">ID</th>
                <th>Kategori</th>
                <th>Nama Kelas</th>
                <th>Tipe Kelas</th>
                <th>Level</th>
                <th>Harga Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12 text-left">
                <td className="text-xs font-bold text-[#4E5566] ps-3">
                  johndoe123
                </td>
                <td className="text-xs font-bold text-[#4E5566]">
                  UI/UX Design
                </td>
                <td className="text-xs font-bold text-[#202244] py-2">
                  Belajar Web Designer dengan Figma
                </td>
                <td className="text-xs font-bold text-dark-green uppercase">
                  Gratis
                </td>
                <td className="text-xs font-bold text-[#202244]">Beginner</td>
                <td className="text-xs font-bold text-[#4E5566]">Rp 0</td>
                <td className="text-xs font-bold">
                  <button className="bg-dark-blue p-1 rounded-xl w-16 text-white mr-2">
                    Ubah
                  </button>
                  <button className="bg-red-500 p-1 rounded-xl w-16 text-white">
                    Hapus
                  </button>
                </td>
              </tr>
              <tr className="h-14 text-left">
                <td className="text-xs font-bold text-[#4E5566] ps-3">
                  supermanxx
                </td>
                <td className="text-xs font-bold text-[#4E5566]">
                  UI/UX Design
                </td>
                <td className="text-xs font-bold text-[#202244] py-2">
                  Belajar Web Designer dengan Figma
                </td>
                <td className="text-xs font-bold text-dark-blue uppercase">
                  Premium
                </td>
                <td className="text-xs font-bold text-[#202244]">Advance</td>
                <td className="text-xs font-bold text-[#4E5566]">Rp 199,000</td>
                <td className="text-xs font-bold">
                  <button className="bg-dark-blue p-1 rounded-xl w-16 text-white mr-2">
                    Ubah
                  </button>
                  <button className="bg-red-500 p-1 rounded-xl w-16 text-white">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Class;
