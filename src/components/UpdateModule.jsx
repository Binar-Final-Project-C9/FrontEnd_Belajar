import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateModuleMutation } from "../service/moduleApi";
import { updateModule } from "../slices/moduleSlice";

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

const UpdateModule = ({ showModalModule, setShowModalModule, moduleId }) => {
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.module?.items);
  const [updatedModule, setUpdatedModule] = useState({
    noModule: "",
    name: "",
    duration: "",
    description: "",
  });

  const [updatedDataModule, { data }] = useUpdateModuleMutation();

  useEffect(() => {
    if (modules && moduleId) {
      const selected = modules.find((module) => module.id === moduleId);
      setUpdatedModule(selected || {});
    }
  }, [modules, moduleId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedModule((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
        window.location.reload();
      }
    } catch (error) {
      console.log(error.data);
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
                  encType="multipart/form-data"
                  onSubmit={submitHandler}
                >
                  <h2 className="text-center font-bold text-gray-800">
                    Edit Modul
                  </h2>
                  <InputField
                    label="Module Id"
                    id="noModule"
                    type="number"
                    placeholder="No Module"
                    value={updatedModule.noModule}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Module Name"
                    value={updatedModule.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Duration"
                    id="duration"
                    type="number"
                    placeholder="Module Duration"
                    value={updatedModule.duration}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Description"
                    id="description"
                    type="text"
                    placeholder="Module Description"
                    value={updatedModule.description}
                    onChange={handleInputChange}
                  />
                  <div className="flex items-center justify-between p-5 gap-5 w-full">
                    <button
                      className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl"
                      type="submit"
                    >
                      Simpan
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
