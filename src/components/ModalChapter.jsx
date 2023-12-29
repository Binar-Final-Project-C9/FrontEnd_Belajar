import { HiX } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateChapterMutation } from "../service/chapterApi";
import { addChapter } from "../slices/chapterSlice";
import { useParams } from "react-router-dom";

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
      className="mt-1 w-full p-2 text-sm font-semibold border rounded-md lg:w-[500px] placeholder:text-sm"
      placeholder={placeholder}
    />
  </div>
);

const ModalChapter = ({ showModalChapter, setShowModalChapter }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [chapterData, setChapterData] = useState({
    noChapter: "",
    name: "",
    courseId: id,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [createChapter, { isError, isLoading }] = useCreateChapterMutation();

  const handleInputChange = (e) => {
    setChapterData({ ...chapterData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createChapter(chapterData).unwrap();
      dispatch(addChapter(res));
      setShowModalChapter(false);
      setChapterData({
        noChapter: "",
        name: "",
        courseId: id,
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    }
  };

  const handleCancelClick = () => {
    setShowModalChapter(false);
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
                    onClick={() => setShowModalChapter(false)}
                  >
                    <HiX className="text-black" />
                  </button>
                </div>
                <form
                  className="w-full px-6 space-y-4"
                  encType="application/json"
                  onSubmit={submitHandler}
                >
                  <h2 className="text-center font-bold text-gray-800">
                    Tambah Chapter
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
                    label="Nama Chapter"
                    id="name"
                    type="text"
                    placeholder="Nama Chapter"
                    value={chapterData.name}
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

export default ModalChapter;
