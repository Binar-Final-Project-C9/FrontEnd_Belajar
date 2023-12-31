import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiPlusCircle, FiSend } from "react-icons/fi";
import { FaExclamationTriangle, FaRegTrashAlt } from "react-icons/fa";
import {
  useFetchNotificationQuery,
  useDeleteNotificationMutation,
  useSendPromoNotificationMutation,
} from "../service/notificationApi";
import {
  removeNotification,
  setNotification,
  sendPromoNotificationSuccess,
  sendPromoNotificationFailure,
  resetPromoNotificationStatus,
} from "../slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalNotification from "./ModalNotification";
import Card from "./Card";
import UpdateNotification from "./UpdateNotification";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const [showModalNotification, setShowModalNotification] = useState(false);
  const [updateModalNotification, setUpdateModalNotification] = useState(false);
  const [notificationIdToUpdate, setNotificationIdToUpdate] = useState(null);
  const [notificationIdToSend, setNotificationIdToSend] = useState(null);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const promoNotificationStatus = useSelector(
    (state) => state.notification.promoNotificationStatus
  );

  const dispatch = useDispatch();
  const {
    data: notification,
    isError,
    isLoading,
  } = useFetchNotificationQuery();
  const notifications = useSelector((state) => state.notification.items);

  useEffect(() => {
    if (notification) {
      dispatch(setNotification(notification));
    }
  }, [dispatch, notification]);

  const [deleteNotifMutation] = useDeleteNotificationMutation();
  const [sendPromoNotificationMutation] = useSendPromoNotificationMutation();

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

  const deleteNotificationHandler = async (notificationId) => {
    try {
      setShowDeleteModal(true);
      setNotificationIdToDelete(notificationId);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  const confirmDeleteHandler = async () => {
    try {
      await deleteNotifMutation(notificationIdToDelete).unwrap();
      setShowDeleteModal(false);
      dispatch(removeNotification(notificationIdToDelete));
      notifySuccess("Promo berhasil dihapus!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleUpdateClick = (notificationId) => {
    setNotificationIdToUpdate(notificationId);
    setUpdateModalNotification(true);
  };

  const sendNotificationHandler = async (notificationId) => {
    try {
      setShowSendModal(true);
      setNotificationIdToSend(notificationId);
    } catch (error) {
      console.error("Error opening send confirmation modal:", error);
    }
  };

  const confirmSendHandler = async () => {
    try {
      await sendPromoNotificationMutation(notificationIdToSend);
      setShowSendModal(false);
      dispatch(
        sendPromoNotificationSuccess("Promo notification sent successfully")
      );
      notifySuccess("Promo berhasil dikirim!");
      // window.location.reload();
    } catch (error) {
      dispatch(setNotification());
      console.error("Error sending promo notification:", error);
      dispatch(
        sendPromoNotificationFailure("Failed to send promo notification")
      );
    }
  };

  if (promoNotificationStatus === "success") {
    // You may want to handle success feedback to the user here
    dispatch(resetPromoNotificationStatus());
  }

  if (promoNotificationStatus === "failure") {
    // You may want to handle failure feedback to the user here
    dispatch(resetPromoNotificationStatus());
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-t-blue-500 h-12 w-12"></div>
      </div>
    );
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <>
      <ToastContainer />
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Kelola Notifikasi
          </h2>
          <div className="flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center primary rounded-full px-3 font-medium gap-2 py-[2px]"
              onClick={() => setShowModalNotification(true)}
            >
              <FiPlusCircle />
              Tambah
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[#EBF3FC] on-primary-text text-sm font-normal">
              <tr className="h-12">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Kategori</th>
                <th className="px-3 py-2">Judul Notifikasi</th>
                <th className="px-3 py-2">Deskripsi</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr className="h-12" key={index}>
                  <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
                    {index + 1}
                  </td>
                  {notification.category === "Promosi" ? (
                    <td className="text-xs text-center font-bold text-dark-blue uppercase pr-2">
                      {notification.category}
                    </td>
                  ) : (
                    <td className="text-xs text-center font-bold text-dark-green uppercase pr-2">
                      {notification.category}
                    </td>
                  )}
                  <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                    {notification.title}
                  </td>
                  <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                    {notification.description}
                  </td>
                  <td className="flex gap-2 text-center text-xs font-bold px-3 py-2">
                    <button
                      className="primary px-3 py-1 rounded-md text-white"
                      onClick={() => handleUpdateClick(notification.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-2 rounded-md text-white"
                      onClick={() => deleteNotificationHandler(notification.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                    {notification.category === "Promosi" && (
                      <button
                        className="bg-dark-blue px-2 rounded-md text-white"
                        onClick={() => sendNotificationHandler(notification.id)}
                      >
                        <FiSend />{" "}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalNotification
          showModalNotification={showModalNotification}
          setShowModalNotification={setShowModalNotification}
        />
        <UpdateNotification
          showModalNotification={updateModalNotification}
          setShowModalNotification={setUpdateModalNotification}
          notificationId={notificationIdToUpdate}
        />
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-96">
              <div className="flex items-center justify-center mb-2">
                <FaExclamationTriangle className="text-red-500 w-8 h-8" />
              </div>
              <p className="text-md font-medium text-center mb-10">
                Apakah anda yakin ingin menghapus notifikasi ini?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-6 py-1 rounded-md transition-all duration-300 hover:bg-opacity-80"
                  onClick={confirmDeleteHandler}
                >
                  Hapus
                </button>
                <button
                  className="border border-gray-300 px-6 rounded-md transition-all duration-300 hover:bg-gray-100"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
        {showSendModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-96">
              <div className="flex items-center justify-center mb-2"></div>
              <p className="text-md font-medium text-center mb-10">
                Apakah anda yakin ingin mengirim promo ini ke user?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="primary text-white px-6 py-1 rounded-md transition-all duration-300 hover:bg-opacity-80"
                  onClick={confirmSendHandler}
                >
                  Kirim
                </button>
                <button
                  className="border border-gray-300 px-6 rounded-md transition-all duration-300 hover:bg-gray-100"
                  onClick={() => setShowSendModal(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
