import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateCourseMutation } from "../service/courseApi";
import { addCourse } from "../slices/courseSlice";

const InputField = ({
  label,
  id,
  type,
  placeholder,
  value,
  onChange,
  disabled,
}) => (
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
      disabled={disabled}
    />
  </div>
);

const Modal = ({ showModal, setShowModal, categories }) => {
  const initialState = {
    name: "",
    level: "",
    categoryId: "",
    description: "",
    benefits: "",
    classCode: "",
    type: "",
    price: "",
    courseBy: "",
    image: null,
  };

  const [courseData, setCourseData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [createCourse, { data, isLoading, isError }] =
    useCreateCourseMutation(initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addCourse(data));
    }
  }, [dispatch, data]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "price" && parseFloat(value) < 0) {
      return;
    }

    setCourseData((prevData) => ({
      ...prevData,
      [id]: id === "image" ? files[0] : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createCourse(courseData).unwrap();
      if (res.status === "success") {
        dispatch(addCourse(res));
        setShowModal(false);
        window.location.reload();
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      setErrorMessage(error.data.message);
    }
  };

  const handleCancelClick = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50">
            <div className="absolute sm:w-[40%] mx-auto max-h-[700px]">
              <div className="border-0 rounded-lg shadow-lg relative h-[700px] flex flex-col bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 mt-2 mr-2 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    <HiX className="text-black" />
                  </button>
                </div>
                <form
                  className="w-full px-4 md:px-10 space-y-1.5"
                  encType="multipart/form-data"
                  style={{ maxWidth: "100%", maxHeight: "80vh" }}
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
                    label="Kode Kelas"
                    id="classCode"
                    type="text"
                    placeholder="Kode Kelas"
                    value={courseData.classCode}
                    onChange={handleInputChange}
                  />
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="level"
                        className="block mb-1 text-sm font-medium"
                      >
                        Level Kelas
                      </label>
                      <select
                        id="level"
                        defaultValue={"none"}
                        onChange={handleInputChange}
                        className="border border-gray-300 h-10 pl-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="none" selected disabled hidden>
                          Pilih Level
                        </option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="categoryId"
                        className="block mb-1 text-sm font-medium"
                      >
                        Kategori Kelas
                      </label>
                      <select
                        id="categoryId"
                        defaultValue={"none"}
                        onChange={handleInputChange}
                        className=" border border-gray-300 h-10 pl-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        (
                        <option value="none" selected disabled hidden>
                          Pilih Kategori
                        </option>
                        ),
                        {categories.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <InputField
                    label="Nama Kelas"
                    id="name"
                    type="text"
                    placeholder="Nama Kelas"
                    value={courseData.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Deskripsi"
                    id="description"
                    type="text"
                    placeholder="Deskripsi Kelas"
                    value={courseData.description}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Benefit Kelas"
                    id="benefits"
                    type="text"
                    placeholder="Benefit Kelas"
                    value={courseData.benefits}
                    onChange={handleInputChange}
                  />
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="type"
                        className="block mb-1 text-sm font-medium"
                      >
                        Tipe Kelas
                      </label>
                      <select
                        id="type"
                        defaultValue={"none"}
                        onChange={handleInputChange}
                        className=" border border-gray-300 h-10 pl-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="none" selected disabled hidden>
                          Pilih Tipe Kelas
                        </option>
                        <option value="Free">FREE</option>
                        <option value="Premium">PREMIUM</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <InputField
                        label="Harga"
                        id="price"
                        type="number"
                        placeholder="Harga Kelas"
                        value={courseData.price}
                        onChange={handleInputChange}
                        disabled={courseData.type === "Free"}
                      />
                    </div>
                  </div>
                  <InputField
                    label="Fasilitator"
                    id="courseBy"
                    type="text"
                    placeholder="Nama Fasilitator"
                    value={courseData.courseBy}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Image"
                    type="file"
                    id="image"
                    placeholder="Course Image"
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

export default Modal;
