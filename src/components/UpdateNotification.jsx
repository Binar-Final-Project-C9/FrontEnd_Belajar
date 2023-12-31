import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useUpdateNotificationMutation } from "../service/notificationApi";
import { updateNotification } from "../slices/notificationSlice";
import "react-toastify/dist/ReactToastify.css";

const InputField = ({ label, id, type, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-2 text-sm font-md border rounded-md placeholder:text-sm"
      placeholder={placeholder}
    />
  </div>
);

const UpdateNotification = ({
  showModalNotification,
  setShowModalNotification,
  notificationId,
}) => {
  const initialState = {
    category: "",
    title: "",
    description: "",
  };

  console.log(notificationId);

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.items);
  const [updatedNotif, setUpdatedNotification] = useState(initialState);
  const [updateDataNotification, { data, isLoading, isError }] =
    useUpdateNotificationMutation(initialState);

  useEffect(() => {
    if (notifications && notificationId) {
      const selected = notifications.find(
        (notification) => notification.id === notificationId
      );
      setUpdatedNotification(selected);
    }
  }, [notifications, notificationId]);

  useEffect(() => {
    if (data) {
      dispatch(updateNotification(data));
    }
  }, [dispatch, data]);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedNotification((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDataNotification({
        id: notificationId,
        updatedNotif,
      }).unwrap();
      if (res.status === "success") {
        setShowModalNotification(false);
        notifySuccess("Berhasil update notifikasi!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const handleCancelClick = () => {
    setShowModalNotification(false);
  };

  return (
    <>
      <ToastContainer />
      {showModalNotification && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[520px] mx-auto max-w-6xl max-h-screen">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModalNotification(false)}
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
                    Edit Notifikasi
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="level"
                        className="block mb-1 text-sm font-medium"
                      >
                        Kategori Notifikasi
                      </label>
                      <select
                        id="category"
                        defaultValue={""}
                        onChange={handleInputChange}
                        className="border border-gray-300 h-10 pl-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="" selected disabled hidden>
                          Pilih Kategori
                        </option>
                        <option value="Notifikasi">Notifikasi</option>
                        <option value="Promosi">Promosi</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <InputField
                        label="Judul Notifikasi"
                        id="title"
                        type="text"
                        placeholder="Judul Notifikasi"
                        value={updatedNotif.title}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <InputField
                    label="Deskripsi"
                    id="description"
                    type="text"
                    placeholder="Deskripsi Notifikasi"
                    value={updatedNotif.description}
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
                      Batal
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

export default UpdateNotification;
