import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateChapterMutation } from "../service/chapterApi";
import { addChapter } from "../slices/chapterSlice";

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
      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
      placeholder={placeholder}
    />
  </div>
);

const ModalChapter = ({ showModalChapter, setshowModalChapter }) => {
  const initialState = {
    noChapter: "",
    name: "",
    courseId: "",
  };

  const [chapterData, setChapterData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [createChapter, { data, isLoading, isError }] =
    useCreateChapterMutation(initialState);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (data) {
  //     // Assuming that `data` contains the chapter information
  //     dispatch(addChapter(data));
  //     setshowModalChapter(false);
  //   }
  // }, [dispatch, data, setshowModalChapter]);

  useEffect(() => {
    if (data) {
      dispatch(addChapter(data));
    }
  }, [dispatch, data]);

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setChapterData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    setChapterData((prevData) => ({
      ...prevData,
      [id]: id === "image" ? files[0] : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting chapterData:", chapterData);
    try {
      const res = await createChapter(chapterData).unwrap();
      if (res.status === "success") {
        dispatch(addChapter(res));
        setshowModalChapter(false);
        window.location.reload();
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      // console.error("Error:", error);
      setErrorMessage(error.data.message);
      setErrorMessage(error.message || "An error occurred");
    }
  };

  return (
    <>
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
                    Tambah Kelas
                  </h2>
                  {isError && (
                    <h2 className="text-center font-bold text-dark-red">
                      {errorMessage}
                    </h2>
                  )}
                  <InputField
                    label="No"
                    id="noChapter"
                    type="number"
                    placeholder="No Chapter"
                    value={chapterData.noChapter}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Chapter Name"
                    value={chapterData.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Course ID"
                    id="courseId"
                    type="number"
                    placeholder="Course ID"
                    value={chapterData.courseId}
                    onChange={handleInputChange}
                  />

                  <div className="flex items-center justify-between p-5 gap-5 w-full">
                    <button
                      className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Simpan"}
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

export default ModalChapter;
