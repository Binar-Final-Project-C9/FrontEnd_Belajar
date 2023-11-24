import React from "react";
import { FiFilter } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import Card from "./Card";

const Home = () => {
  return (
    <>
      <Card />
      <div>
        <div className="py-5 mx-auto lg:flex items-center text-center justify-between">
          <h2 className="font-bold text-lg mb-4">Status Pembayaran</h2>
          <div className="text-dark-blue flex items-center justify-between gap-5">
            <button className="flex items-center justify-center border-dark-blue border-2 rounded-full px-2 py-1 font-bold gap-2">
              <FiFilter />
              Filter
            </button>
            <MdOutlineSearch className="w-8 h-8" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-[#EBF3FC] text-left text-sm font-normal">
              <tr className="h-9">
                <th>ID</th>
                <th>Kategori</th>
                <th>Kelas Premium</th>
                <th>Status</th>
                <th>Metode Pembayaran</th>
                <th>Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-14">
                <td className="text-xs font-bold text-[#4E5566]">johndoe123</td>
                <td className="text-xs font-bold text-[#4E5566]">
                  UI/UX Design
                </td>
                <td className="text-xs font-bold text-[#202244] py-2">
                  Belajar Web Designer dengan Figma
                </td>
                <td className="text-sm font-bold text-dark-green uppercase">
                  SUDAH BAYAR
                </td>
                <td className="text-xs font-bold text-[#202244]">
                  Credit Card
                </td>
                <td className="text-xs font-bold text-[#4E5566]">
                  21 Sep, 2023 at 2:00 AM
                </td>
              </tr>
              <tr className="h-14">
                <td className="text-xs font-bold text-[#4E5566]">supermanxx</td>
                <td className="text-xs font-bold text-[#4E5566]">
                  UI/UX Design
                </td>
                <td className="text-xs font-bold text-[#202244] py-2">
                  Belajar Web Designer dengan Figma
                </td>
                <td className="text-sm font-bold text-red-500 uppercase">
                  BELUM BAYAR
                </td>
                <td className="text-xs font-bold text-[#202244]">-</td>
                <td className="text-xs font-bold text-[#4E5566]">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
