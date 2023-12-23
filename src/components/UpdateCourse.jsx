import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCourseMutation } from "../service/courseApi";
import { updateCourse } from "../slices/courseSlice";

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

const UpdateCourse = ({ showModal, setShowModal, courseId }) => {
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
                    Edit Kelas
                  </h2>
                  <InputField
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Course Name"
                    value={updatedCourse.name}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Level"
                    id="level"
                    type="text"
                    placeholder="Course Level"
                    value={updatedCourse.level}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Category"
                    id="categoryId"
                    type="number"
                    placeholder="Course Category"
                    value={updatedCourse.categoryId}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Description"
                    id="description"
                    type="text"
                    placeholder="Course Description"
                    value={updatedCourse.description}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Benefits"
                    id="benefits"
                    type="text"
                    placeholder="Course Benefits"
                    value={updatedCourse.benefits}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Class Code"
                    id="classCode"
                    type="text"
                    placeholder="Class Code"
                    value={updatedCourse.classCode}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Type"
                    id="type"
                    type="text"
                    placeholder="Course Type"
                    value={updatedCourse.type}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Price"
                    id="price"
                    type="number"
                    placeholder="Course Price"
                    value={updatedCourse.price}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Course By"
                    id="courseBy"
                    type="text"
                    placeholder="Course By"
                    value={updatedCourse.courseBy}
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

export default UpdateCourse;
