// Class.js
import { useState, useEffect } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchCoursesQuery,
  useDeleteCourseMutation,
} from "../service/courseApi";
import { setCourse, removeCourse } from "../slices/courseSlice";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import UpdateCourse from "./UpdateCourse";
import Card from "./Card";
import "../colors.module.css";

const Class = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [courseIdToUpdate, setCourseIdToUpdate] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);

  const dispatch = useDispatch();
  const { data: courseData, isError, isLoading } = useFetchCoursesQuery();
  const [deleteCourseMutation] = useDeleteCourseMutation();
  const courses = useSelector((state) => state.course.items);

  const deleteCourseHandler = async (courseId) => {
    try {
      setShowDeleteModal(true);
      setCourseIdToDelete(courseId);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  const confirmDeleteHandler = async () => {
    try {
      await deleteCourseMutation(courseIdToDelete).unwrap();
      setShowDeleteModal(false);
      dispatch(removeCourse(courseIdToDelete));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  useEffect(() => {
    if (courseData) {
      dispatch(setCourse(courseData));
    }
  }, [dispatch, courseData]);

  const handleUpdateClick = (courseId) => {
    setCourseIdToUpdate(courseId);
    setUpdateModal(true);
  };

  const handleFilterClick = () => {
    setFilterDropdownOpen((prev) => !prev);
  };

  const handleFilterChange = (filterType, value) => {
    setFilterDropdownOpen(false);
    if (filterType === "level") {
      setSelectedLevel(value);
    } else if (filterType === "classType") {
      setSelectedClassType(value);
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search term:", searchTerm);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const filteredCourses = courses.filter((course) => {
    if (selectedLevel && course.level !== selectedLevel) {
      return false;
    }
    if (selectedClassType && course.type !== selectedClassType) {
      return false;
    }
    return true;
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Kelola Kelas
          </h2>
          <div className="flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center primary rounded-full px-3 font-medium gap-2 py-[2px]"
              onClick={() => setShowModal(true)}
            >
              <FiPlusCircle />
              Tambah
            </button>
            <button
              className="flex items-center justify-center primary-text border-[#73daa4] border-2 rounded-full px-6 font-bold gap-2"
              onClick={handleFilterClick}
            >
              <FiFilter className="primary-text" />
              Filter
            </button>
            {isSearchActive ? (
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="border-2 rounded-full border-[#73daa4] p-0 ps-4 me-1 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleSearchClear}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none right-16 top 1/2 "
                  >
                    &times;
                  </button>
                )}
              </form>
            ) : (
              <MdOutlineSearch
                className="w-6 h-6 primary-text cursor-pointer"
                onClick={handleSearchClick}
              />
            )}
          </div>
        </div>
        {filterDropdownOpen && (
          <div className="flex justify-end gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Level:
              </label>
              <select
                className="mt-1 block w-32 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 rounded-md shadow-sm"
                onChange={(e) => handleFilterChange("level", e.target.value)}
                value={selectedLevel}
              >
                <option value="">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Class Type:
              </label>
              <select
                className="mt-1 block w-32 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 rounded-md shadow-sm"
                onChange={(e) =>
                  handleFilterChange("classType", e.target.value)
                }
                value={selectedClassType}
              >
                <option value="">All</option>
                <option value="premium">Premium</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-[#EBF3FC] text-left text-sm font-normal">
              <tr className="h-12">
                <th className="ps-3">ID</th>
                <th>Kategori</th>
                <th>Nama Kelas</th>
                <th>Tipe Kelas</th>
                <th>Level</th>
                <th>Harga Kelas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr className="h-12 text-left" key={index}>
                  <td className="text-xs font-bold text-[#4E5566] ps-3">
                    {course.classCode}
                  </td>
                  <td className="text-xs font-bold text-[#4E5566]">
                    {course?.Category?.name}
                  </td>
                  <td className="text-xs font-bold text-[#202244] py-2">
                    <Link to={`/course/${course.id}`}>{course.name}</Link>
                  </td>
                  <td className="text-xs font-bold text-dark-green uppercase">
                    {course.type}
                  </td>
                  <td className="text-xs font-bold text-[#202244]">
                    {course.level}
                  </td>
                  <td className="text-xs font-bold text-[#4E5566]">
                    Rp {course.price}
                  </td>
                  <td className="text-xs font-bold">
                    <button
                      className="primary p-1 rounded-xl w-16 text-white mr-2"
                      onClick={() => handleUpdateClick(course.id)}
                    >
                      Ubah
                    </button>
                    <button
                      className="bg-red-500 p-1 rounded-xl w-16 text-white"
                      onClick={() => deleteCourseHandler(course.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <UpdateCourse
        showModal={updateModal}
        setShowModal={setUpdateModal}
        courseId={courseIdToUpdate}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-96">
            <div className="flex items-center justify-center mb-2">
              <FaExclamationTriangle className="text-red-500 w-8 h-8" />
            </div>
            <p className="text-md font-medium text-center mb-10">
              Apakah Anda yakin ingin menghapus kelas ini?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-6 py-1 rounded-md transition-all duration-300 hover:bg-opacity-80"
                onClick={confirmDeleteHandler}
              >
                Hapus
              </button>
              <button
                className="border border-gray-300 px-6 rounded-md transition-all duration-300 hover:bg-gray-100"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Class;
