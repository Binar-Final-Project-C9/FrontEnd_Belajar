import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatePaymentStatusMutation } from "../service/paymentApi";
import { updatePaymentStatus } from "../slices/paymentSlice";

const InputField = ({ label, id, type, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {type === "option" ? (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md lg:w-[500px] placeholder:text-sm"
      >
        <option value="paid">PAID</option>
        <option value="unpaid">UNPAID</option>
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      />
    )}
  </div>
);

const UpdatePaymentStatus = ({ showModal, setShowModal, paymentId }) => {
  const initialState = {
    status: "",
  };
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment.items);

  const [updatedPayment, setUpdatedPayment] = useState(initialState);

  const [updateDataPayment, { data, isLoading, isError }] =
    useUpdatePaymentStatusMutation(initialState);

  useEffect(() => {
    if (payments && paymentId) {
      const selected = payments.find((payment) => payment.id === paymentId);
      setUpdatedPayment(selected);
    }
  }, [payments, paymentId]);

  useEffect(() => {
    if (data) {
      dispatch(updatePaymentStatus(data));
    }
  }, [dispatch, data]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedPayment((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(updatedPayment);
    console.log("Payment ID:", paymentId);
    try {
      const res = await updateDataPayment({
        id: paymentId,
        updatedPayment,
      }).unwrap();
      if (res.status === "success") {
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error(error.data);
    }
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto mx-auto max-w-6xl max-h-screen">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    <HiX className="text-black" />
                  </button>
                </div>
                <form
                  className="w-full px-6 space-y-4"
                  encType="multipart/form-data"
                  onSubmit={submitHandler}
                >
                  <h2 className="text-center font-bold text-gray-800">
                    Edit Status Pembayaran
                  </h2>
                  <InputField
                    label="Status"
                    id="status"
                    type="option"
                    placeholder="Payment Status"
                    value={updatedPayment.status}
                    onChange={handleInputChange}
                  />
                  <div className="flex justify-center p-5 gap-3">
                    <button
                      className="primary text-white w-[100px] font-bold text-sm h-[30px] rounded-2xl"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Simpan"}
                    </button>
                    <button
                      className="bg-dark-red text-white w-[100px] font-bold text-sm h-[30px] rounded-2xl"
                      type="submit"
                      onClick={handleCancelClick}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Batal"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default UpdatePaymentStatus;
