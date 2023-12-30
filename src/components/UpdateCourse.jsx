import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCourseMutation } from "../service/courseApi";
import { updateCourse } from "../slices/courseSlice";

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

const UpdateCourse = ({ showModal, setShowModal, courseId, categories }) => {
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
    image: "",
  };
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.items);

  const [updatedCourse, setUpdatedCourse] = useState(initialState);

  const [updateDataCourse, { data, isLoading, isError }] =
    useUpdateCourseMutation(initialState);

  useEffect(() => {
    if (courses && courseId) {
      const selected = courses.find((course) => course.id === courseId);
      setUpdatedCourse({
        ...selected,
        image: selected?.imageUrl || "",
      });
    }
  }, [courses, courseId]);

  useEffect(() => {
    if (data) {
      dispatch(updateCourse(data));
    }
  }, [dispatch, data]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;

    if (id === "price" && parseFloat(value) < 0) {
      return;
    }

    setUpdatedCourse((prevData) => ({
      ...prevData,
      [id]: id === "image" ? files[0] : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateDataCourse({
        id: courseId,
        updatedCourse,
      }).unwrap();
      if (res.status === "success") {
        setShowModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.data);
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
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
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
                    Edit Kelas
                  </h2>
                  <InputField
                    label="Kode Kelas"
                    id="classCode"
                    type="text"
                    placeholder="Kode Kelas"
                    value={updatedCourse.classCode}
                    onChange={handleInputChange}
                  />
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="level"
                        className="block mb-2 text-sm font-medium"
                      >
                        Level Kelas
                      </label>
                      <select
                        id="level"
                        value={updatedCourse.value}
                        onChange={handleInputChange}
                        className=" border h-10 pl-3 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option
                          value="Beginner"
                          selected={updatedCourse.level == "Beginner"}
                        >
                          Beginner
                        </option>
                        <option
                          value="Intermediate"
                          selected={updatedCourse.level == "Intermediate"}
                        >
                          Intermediate
                        </option>
                        <option
                          value="Advanced"
                          selected={updatedCourse.level == "Advanced"}
                        >
                          Advanced
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="categoryId"
                        className="block mb-2 text-sm font-medium"
                      >
                        Kategori Kelas
                      </label>
                      <select
                        id="categoryId"
                        value={updatedCourse.categoryId}
                        onChange={handleInputChange}
                        className=" border h-10 pl-3 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
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
                    value={updatedCourse.name}
                    onChange={handleInputChange}
                  />

                  <InputField
                    label="Deskripsi"
                    id="description"
                    type="text"
                    placeholder="Deskripsi Kelas"
                    value={updatedCourse.description}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Benefit Kelas"
                    id="benefits"
                    type="text"
                    placeholder="Benefit Kelas"
                    value={updatedCourse.benefits}
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
                        value={updatedCourse.value}
                        onChange={handleInputChange}
                        className=" border border-gray-300 h-10 pl-3  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                      >
                        <option
                          value="Free"
                          selected={updatedCourse.type == "Free"}
                        >
                          FREE
                        </option>
                        <option
                          value="Premium"
                          selected={updatedCourse.type == "Premium"}
                        >
                          PREMIUM
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <InputField
                        label="Harga"
                        id="price"
                        type="number"
                        placeholder="Harga Kelas"
                        value={updatedCourse.price}
                        onChange={handleInputChange}
                        disabled={updateCourse.type === "Free"}
                      />
                    </div>
                  </div>
                  <InputField
                    label="Fasilitator"
                    id="courseBy"
                    type="text"
                    placeholder="Nama Fasilitator"
                    value={updatedCourse.courseBy}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Image"
                    type="file"
                    id="image"
                    placeholder="Image Kelas"
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

export default UpdateCourse;
