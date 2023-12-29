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

                  <div>
                    <label
                      htmlFor="level"
                      className="block mb-2 text-sm font-medium"
                    >
                      Level
                    </label>
                    <select
                      id="level"
                      value={updatedCourse.value}
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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

                  <div>
                    <label
                      htmlFor="categoryId"
                      className="block mb-2 text-sm font-medium"
                    >
                      Select Kategori
                    </label>
                    <select
                      id="categoryId"
                      value={updatedCourse.categoryId}
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
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

                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium"
                    >
                      Type
                    </label>
                    <select
                      id="type"
                      value={updatedCourse.value}
                      onChange={handleInputChange}
                      className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
