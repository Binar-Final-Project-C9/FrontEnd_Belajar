import { FiFilter } from 'react-icons/fi';
import { MdOutlineSearch } from 'react-icons/md';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchPaymentQuery } from '../service/paymentApi';
import { setPayment } from '../slices/paymentSlice';

const formatDate = (isoDate) => {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(isoDate).toLocaleString('en-US', options);
};

const Home = () => {
  const dispatch = useDispatch();
  const { data: paymentData, isError, isLoading } = useFetchPaymentQuery();

  const payments = useSelector((state) => state.payment.items);

  useEffect(() => {
    if (paymentData) {
      dispatch(setPayment(paymentData));
    }
  }, [dispatch, paymentData]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center">Error...</div>;
  }

  return (
    <>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex items-center text-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Status Pembayaran
          </h2>
          <div className="text-dark-blue flex items-center justify-center gap-3">
            <button className="flex items-center justify-center border-dark-blue border-2 rounded-full px-4 font-bold gap-2">
              <FiFilter />
              Filter
            </button>
            <MdOutlineSearch className="w-7 h-7" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-[#EBF3FC] text-left text-sm font-normal">
              <tr className="h-12">
                <th className="ps-3">ID</th>
                <th>Kategori</th>
                <th>Kelas Premium</th>
                <th>Status</th>
                <th>Metode Pembayaran</th>
                <th>Tanggal Bayar</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr className="h-12 text-left" key={payment.id}>
                  <td className="text-xs font-bold text-[#4E5566] ps-3">
                    {payment.User.email}
                  </td>
                  <td className="text-xs font-bold text-[#4E5566]">
                    {payment.Course.Category.name}
                  </td>
                  <td className="text-xs font-bold text-[#202244] py-2">
                    {/* <Link to={`/course/${payment.id}`}>{payment.name}</Link> */}
                    {payment.Course.type}
                  </td>
                  {payment.status === 'paid' ? (
                    <td className="text-xs font-bold text-dark-green uppercase">
                      {payment.status}
                    </td>
                  ) : (
                    <td className="text-xs font-bold text-dark-red uppercase">
                      {payment.status}
                    </td>
                  )}
                  <td className="text-xs font-bold text-[#202244]">
                    {payment.paymentType ? (
                      <span>{payment.paymentType}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="text-xs font-bold text-[#4E5566]">
                    {payment.settlementTime ? (
                      <span>{formatDate(payment.settlementTime)}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
