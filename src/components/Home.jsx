import { useState, useEffect, useRef } from "react";
import { FiFilter } from "react-icons/fi";
import { MdOutlineSearch } from "react-icons/md";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useFetchPaymentQuery } from "../service/paymentApi";
import { setPayment } from "../slices/paymentSlice";
import "../colors.module.css";

const formatDate = (isoDate) => {
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(isoDate).toLocaleString("en-US", options);
};

const Home = () => {
  const dispatch = useDispatch();
  const { data: paymentData, isError, isLoading } = useFetchPaymentQuery();
  const payments = useSelector((state) => state.payment.items);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (paymentData) {
      dispatch(setPayment(paymentData));
    }
  }, [dispatch, paymentData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterSelect = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters([]);
    } else {
      setSelectedFilters([filter]);
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search term:", searchTerm);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const filteredPayments = selectedFilters.length
    ? payments.filter((payment) =>
        selectedFilters.includes(payment.status.toLowerCase())
      )
    : payments;

  const searchFilteredPayments = filteredPayments.filter((payment) =>
    payment.User.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex items-center text-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Status Pembayaran
          </h2>
          <div className="flex items-center gap-3 relative">
            <div className="relative inline-block">
              <button
                onClick={handleFilterClick}
                className="flex items-center justify-center primary-text border-[#73daa4] border-2 rounded-full px-6 font-medium gap-2 focus:outline-none"
              >
                <FiFilter className="primary-text" />
                Filter
              </button>
              {isFilterOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 mt-2 p-2 pe-6 bg-white on-tertiary-text rounded-md shadow-md"
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes("paid")}
                      onChange={() => handleFilterSelect("paid")}
                      className="mr-4"
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes("unpaid")}
                      onChange={() => handleFilterSelect("unpaid")}
                      className="mr-4"
                    />
                    Unpaid
                  </label>
                </div>
              )}
            </div>
            {isSearchActive ? (
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by ID.."
                  className="border-2 rounded-full border-[#73daa4] p-0 ps-4 me-1 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleSearchClear}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    &times;
                  </button>
                )}
              </form>
            ) : (
              <MdOutlineSearch
                className="w-6 h-6 primary-text cursor-pointer"
                onClick={handleSearchClick}
              />
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-[#EBF3FC] text-left text-sm font-normal">
              <tr className="h-12">
                <th className="pl-4 pr-2">ID</th>
                <th className="pr-2">Kategori</th>
                <th className="pr-2">Kelas Premium</th>
                <th className="pr-2">Status</th>
                <th className="pr-2">Metode Pembayaran</th>
                <th className="pr-4">Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              {searchFilteredPayments.length === 0 ? (
                <tr className="h-12">
                  <td colSpan="6" className="text-center">
                    Tidak ada data yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                searchFilteredPayments.map((payment) => (
                  <tr className="h-12 text-left" key={payment.id}>
                    <td className="text-xs font-bold text-[#4E5566] pl-4 pr-2">
                      {payment.User.email}
                    </td>
                    <td className="text-xs font-bold text-[#4E5566] pr-2">
                      {payment.Course.Category.name}
                    </td>
                    <td className="text-xs font-bold text-[#202244] pr-2">
                      {payment.Course.type}
                    </td>
                    {payment.status === "paid" ? (
                      <td className="text-xs font-bold text-dark-green uppercase pr-2">
                        {payment.status}
                      </td>
                    ) : (
                      <td className="text-xs font-bold text-dark-red uppercase pr-2">
                        {payment.status}
                      </td>
                    )}
                    <td className="text-xs font-bold text-[#202244] pr-2">
                      {payment.paymentType ? (
                        <span>{payment.paymentType}</span>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td className="text-xs font-bold text-[#4E5566] pr-4">
                      {payment.settlementTime ? (
                        <span>{formatDate(payment.settlementTime)}</span>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
