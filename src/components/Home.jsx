import { FiFilter } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import Card from "./Card";

const Home = () => {
  return (
    <>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex items-center text-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Status Pembayaran
          </h2>
          <div className="text-dark-blue flex items-center justify-center gap-3 my-2">
            <button className="flex items-center justify-center border-dark-blue border-2 rounded-full px-4 font-bold gap-2">
              <FiFilter />
              Filter
            </button>
            <MdOutlineSearch className="w-7 h-7" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-[#EBF3FC] text-center text-sm font-normal">
              <tr className="h-12">
                <th>ID</th>
                <th>Kategori</th>
                <th>Kelas Premium</th>
                <th>Status</th>
                <th>Metode Pembayaran</th>
                <th>Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12 text-center">
                <td className="text-xs font-bold text-[#4E5566]">johndoe123</td>
                <td className="text-xs font-bold text-[#4E5566]">
                  UI/UX Design
                </td>
                <td className="text-xs font-bold text-[#202244] py-2">
                  Belajar Web Designer dengan Figma
                </td>
                <td className="text-xs font-bold text-dark-green uppercase">
                  SUDAH BAYAR
                </td>
                <td className="text-xs font-bold text-[#202244]">
                  Credit Card
                </td>
                <td className="text-xs font-bold text-[#4E5566]">
                  21 Sep, 2023 at 2:00 AM
                </td>
              </tr>
              <tr className="h-14 text-center">
                <td className="text-xs font-bold text-[#4E5566]">supermanxx</td>
                <td className="text-xs font-bold text-[#4E5566]">
                  UI/UX Design
                </td>
                <td className="text-xs font-bold text-[#202244] py-2">
                  Belajar Web Designer dengan Figma
                </td>
                <td className="text-xs font-bold text-red-500 uppercase">
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
