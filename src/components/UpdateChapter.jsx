import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useUpdateChapterMutation } from "../service/chapterApi";
import { updateChapter } from "../slices/chapterSlice";
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
      className="mt-1 w-full p-2 text-sm font-md border rounded-md lg:w-[500px] placeholder:text-sm"
      placeholder={placeholder}
    />
  </div>
);

const UpdateChapter = ({
  showModalChapter,
  setshowModalChapter,
  chapterId,
}) => {
  const initialState = {
    name: "",
  };

  const dispatch = useDispatch();
  const chapters = useSelector((state) => state.chapter.items);

  const [updatedChapter, setUpdatedChapter] = useState(initialState);

  const [updateDataChapter, { data, isLoading }] =
    useUpdateChapterMutation(initialState);

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

  useEffect(() => {
    if (chapters && chapterId) {
      const selected = chapters.find((chapter) => chapter.id === chapterId);
      setUpdatedChapter(selected);
    }
  }, [chapters, chapterId]);

  useEffect(() => {
    if (data) {
      dispatch(updateChapter(data));
    }
  }, [dispatch, data]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedChapter((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(updatedChapter);
    try {
      const res = await updateDataChapter({
        id: chapterId,
        updatedChapter,
      }).unwrap();
      if (res.status === "success") {
        setshowModalChapter(false);
        notifySuccess("Berhasil edit chapter!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const handleCancelClick = () => {
    setshowModalChapter(false);
  };

  return (
    <>
      <ToastContainer />
      {showModalChapter && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto mx-auto max-w-6xl max-h-screen">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setshowModalChapter(false)}
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
                    Edit Chapter
                  </h2>
                  <InputField
                    label="Nama Chapter"
                    id="name"
                    type="text"
                    placeholder="Nama Chapter"
                    value={updatedChapter.name}
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

export default UpdateChapter;
