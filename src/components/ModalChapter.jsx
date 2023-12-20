import { HiX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateChapterMutation } from '../service/chapterApi';
import { addChapter } from '../slices/chapterSlice';
import { useParams } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const { id } = useParams();
  const [chapterData, setChapterData] = useState({
    noChapter: '',
    name: '',
    courseId: id,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [createChapter, { isError, isLoading }] = useCreateChapterMutation();

  const handleInputChange = (e) => {
    setChapterData({ ...chapterData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createChapter(chapterData).unwrap();
      dispatch(addChapter(res));
      setshowModalChapter(false);
      setChapterData({
        noChapter: '',
        name: '',
        courseId: id,
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
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
                    onClick={() => setshowModalChapter(false)}>
                    <HiX className="text-black" />
                  </button>
                </div>
                <form
                  className="w-full px-6 space-y-4"
                  encType="application/json"
                  onSubmit={submitHandler}>
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
                  <div className="flex items-center justify-between p-5 gap-5 w-full">
                    <button
                      className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl"
                      type="submit"
                      disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Simpan'}
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
