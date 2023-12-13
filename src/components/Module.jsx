import { useState } from 'react';
import { HiX } from 'react-icons/hi';

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

const Module = ({ showModal, setShowModal }) => {
  const initialState = {
    video: null,
    videoUrl: '',
  };

  const [courseData, setCourseData] = useState(initialState);
  const [videoOption, setVideoOption] = useState('file');

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setCourseData((prevData) => ({
      ...prevData,
      [id]: value,
      [videoOption === 'file' ? 'video' : 'videoUrl']: value,
    }));
  };

  const handleVideoOptionChange = (e) => {
    setVideoOption(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(courseData);
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
                    onClick={() => setShowModal(false)}>
                    <HiX className="text-black" />
                  </button>
                </div>
                <form
                  className="w-full px-6 space-y-4"
                  onSubmit={submitHandler}>
                  <h2 className="text-center font-bold text-gray-800">
                    Tambah Kelas
                  </h2>
                  <InputField
                    label="Video"
                    value={
                      videoOption === 'file'
                        ? courseData.video
                        : courseData.videoUrl
                    }
                    id="video"
                    type={videoOption === 'file' ? 'file' : 'text'}
                    placeholder={
                      videoOption === 'file'
                        ? 'Upload Video File'
                        : 'Enter Video URL'
                    }
                    onChange={handleInputChange}
                  />
                  <div className="flex items-center space-x-2">
                    <label>
                      <input
                        type="radio"
                        value="file"
                        checked={videoOption === 'file'}
                        onChange={handleVideoOptionChange}
                      />
                      Upload File
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="url"
                        checked={videoOption === 'url'}
                        onChange={handleVideoOptionChange}
                      />
                      Video URL
                    </label>
                  </div>
                </form>
                <div className="flex items-center justify-between p-5 gap-5 w-full">
                  <button
                    className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl"
                    type="submit">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default Module;
