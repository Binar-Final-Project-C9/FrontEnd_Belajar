import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateCourseMutation } from "../service/courseApi";
import { addCourse } from "../slices/courseSlice";

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
                    onClick={() => setShowModal(false)}
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
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Course Name"
                    value={courseData.name}
                    onChange={handleInputChange}
                  />

                  <div>
                    <label
                      htmlFor="level"
                      className="block mb-2 text-sm font-medium"
                    >
                      Level
                    </label>
                    <select
                      id="level"
                      defaultValue={"none"}
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="none" selected disabled hidden>
                        Pilih Level
                      </option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="categoryId"
                      className="block mb-2 text-sm font-medium"
                    >
                      Select Kategori
                    </label>
                    <select
                      id="categoryId"
                      defaultValue={"none"}
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                  <InputField
                    label="Description"
                    id="description"
                    type="text"
                    placeholder="Course Description"
                    value={courseData.description}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Benefits"
                    id="benefits"
                    type="text"
                    placeholder="Course Benefits"
                    value={courseData.benefits}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Class Code"
                    id="classCode"
                    type="text"
                    placeholder="Class Code"
                    value={courseData.classCode}
                    onChange={handleInputChange}
                  />
                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      defaultValue={"none"}
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value="none" selected disabled hidden>
                        Pilih Type
                      </option>
                      <option value="Free">FREE</option>
                      <option value="Premium">PREMIUM</option>
                    </select>
                  </div>
                  <InputField
                    label="Price"
                    id="price"
                    type="number"
                    placeholder="Course Price"
                    value={courseData.price}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Course By"
                    id="courseBy"
                    type="text"
                    placeholder="Course By"
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

export default Modal;
