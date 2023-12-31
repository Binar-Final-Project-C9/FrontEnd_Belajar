import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useUpdateModuleMutation } from "../service/moduleApi";
import { updateModule } from "../slices/moduleSlice";
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

const UpdateModule = ({ showModalModule, setShowModalModule, moduleId }) => {
  const dispatch = useDispatch();
  const { idChapter } = useParams();
  const modules = useSelector((state) => state.module?.items);
  const [updatedModule, setUpdatedModule] = useState({
    noModule: "",
    name: "",
    description: "",
    videoUrl: "",
    isUnlocked: "true",
    chapterId: idChapter,
  });
  const [typeVideo, setTypeVideo] = useState("file");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedDataModule, { isError, isLoading }] = useUpdateModuleMutation();

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
    if (modules && moduleId) {
      const selected = modules.find((module) => module.id === moduleId);
      setUpdatedModule(selected || {});
    }
  }, [modules, moduleId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "noModule" && parseFloat(value) < 0) {
      return;
    }

    setUpdatedModule((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    setUpdatedModule({ ...updatedModule, [e.target.id]: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(updatedDataModule);
    try {
      const res = await updatedDataModule({
        id: moduleId,
        updatedModule,
      }).unwrap();
      if (res.status === "success") {
        dispatch(updateModule(res.data));
        setShowModalModule(false);
        notifySuccess("Berhasil edit modul!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error.data);
      setErrorMessage(error.data.message);
    }
  };

  const handleCancelClick = () => {
    setShowModalModule(false);
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
                  encType="multipart/form-data"
                  onSubmit={submitHandler}
                >
                  <h2 className="text-center font-bold text-gray-800">
                    Edit Modul
                  </h2>
                  {isError && (
                    <h2 className="text-center font-bold text-dark-red">
                      {errorMessage}
                    </h2>
                  )}
                  <InputField
                    label="Nomor Modul"
                    id="noModule"
                    type="number"
                    placeholder="No Modul"
                    value={updatedModule.noModule}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Nama Modul"
                    id="name"
                    type="text"
                    placeholder="Nama Modul"
                    value={updatedModule.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Deskripsi Modul"
                    id="description"
                    type="text"
                    placeholder="Deskripsi Modul"
                    value={updatedModule.description}
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
                        onChange={(e) => setTypeVideo("file")}
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
                        onChange={(e) => setTypeVideo("link")}
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
                      label="Link Video"
                      id="videoUrl"
                      type="text"
                      placeholder="URL Video"
                      // value={updatedModule.videoUrl}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <InputField
                      label="Upload Video"
                      id="video"
                      type="file"
                      placeholder="Module Vidio"
                      // value={updatedModule.duration}
                      onChange={handleInputFile}
                    />
                  )}
                  <div>
                    <label
                      htmlFor="isUnlocked"
                      className="block mb-2 text-sm font-medium"
                    >
                      Tipe Modul
                    </label>
                    <select
                      id="isUnlocked"
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option
                        value="true"
                        selected={updatedModule.isUnlocked == true}
                      >
                        Unlocked
                      </option>
                      <option
                        value="false"
                        selected={updatedModule.isUnlocked == false}
                      >
                        Locked
                      </option>
                    </select>
                  </div>

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

export default UpdateModule;
