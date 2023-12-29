import { HiX } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateModuleMutation } from "../service/moduleApi";
import { addModule } from "../slices/moduleSlice";
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
      className="mt-1 w-full p-2 border rounded-md lg:w-[500px]"
      placeholder={placeholder}
    />
  </div>
);

const ModalModule = ({ showModalModule, setShowModalModule }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [moduleData, setModuleData] = useState({
    noModule: "",
    name: "",
    description: "",
    videoUrl: "",
    isUnlocked: "true",
    chapterId: id,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [typeVideo, setTypeVideo] = useState("file");
  const [createModule, { isError, isLoading }] = useCreateModuleMutation();

  const handleInputChange = (e) => {
    setModuleData({ ...moduleData, [e.target.id]: e.target.value });
  };
  const handleInputFile = (e) => {
    const file = e.target.files[0];
    setModuleData({ ...moduleData, [e.target.id]: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("moduleData:", moduleData);
    try {
      const res = await createModule(moduleData).unwrap();
      dispatch(addModule(res));
      setShowModalModule(false);
      setModuleData({
        noModule: "",
        name: "",
        description: "",
        videoUrl: "",
        isUnlocked: "true",
        chapterId: id,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.message);
    }
  };

  return (
    <>
      {showModalModule && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto mx-auto max-w-6xl max-h-screen">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModalModule(false)}
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
                    Tambah Modul
                  </h2>
                  {isError && (
                    <h2 className="text-center font-bold text-dark-red">
                      {errorMessage}
                    </h2>
                  )}
                  <InputField
                    label="No"
                    id="noModule"
                    type="number"
                    placeholder="No Module"
                    value={moduleData.noModule}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Module Name"
                    value={moduleData.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Description"
                    id="description"
                    type="text"
                    placeholder="Module Description"
                    value={moduleData.description}
                    onChange={handleInputChange}
                  />
                  <div className="flex">
                    <div className="flex items-center me-4">
                      <input
                        id="inline-radio"
                        checked={typeVideo == "file"}
                        type="radio"
                        value="file"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        onChange={(e) => setTypeVideo(e.target.value)}
                      />
                      <label
                        htmlFor="inline-radio"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        File
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-2-radio"
                        checked={typeVideo == "link"}
                        type="radio"
                        value="link"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        onChange={(e) => setTypeVideo(e.target.value)}
                      />
                      <label
                        htmlFor="inline-2-radio"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        Link Youtube
                      </label>
                    </div>
                  </div>
                  {typeVideo == "link" ? (
                    <InputField
                      label="Video"
                      id="videoUrl"
                      type="text"
                      placeholder="Module Video"
                      value={moduleData.videoUrl}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <InputField
                      label="Video"
                      id="video"
                      type="file"
                      placeholder="Module Video"
                      value={moduleData.duration}
                      onChange={handleInputFile}
                    />
                  )}
                  <div>
                    <label
                      htmlFor="isUnlocked"
                      className="block mb-2 text-sm font-medium"
                    >
                      Select Type Module
                    </label>
                    <select
                      id="isUnlocked"
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="true">Unlocked</option>
                      <option value="false">Locked</option>
                    </select>
                  </div>

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

export default ModalModule;
