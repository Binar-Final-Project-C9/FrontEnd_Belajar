import { useState, useEffect } from "react";
import { FiFilter, FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaExclamationTriangle, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
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
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedClassType, setSelectedClassType] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { data: courseData, isError, isLoading } = useFetchCoursesQuery();
  const [deleteCourseMutation] = useDeleteCourseMutation();
  const courses = useSelector((state) => state.course.items);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/category");
      const data = await res.json();
      setCategory(data.data.categories);
    };
    if (courseData) {
      dispatch(setCourse(courseData));
    }
    fetchCategory();
  }, [dispatch, courseData]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const results = courses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, courses]);

  useEffect(() => {
    if (showModal || updateModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal, updateModal, showDeleteModal]);

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
      window.location.reload();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateClick = (courseId) => {
    setCourseIdToUpdate(courseId);
    setUpdateModal(true);
  };

  const handleFilterClick = () => {
    setFilterDropdownVisible((prev) => !prev);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "level") {
      setSelectedLevel(value);
    } else if (filterType === "classType") {
      setSelectedClassType(value);
    }
    setFilterDropdownVisible(true);
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    setSearchResults([]);
  };

  const filteredCourses = courses.filter((course) => {
    const levelMatch =
      !selectedLevel ||
      course.level.toLowerCase() === selectedLevel.toLowerCase();

    const typeMatch =
      !selectedClassType ||
      course.type.toLowerCase() === selectedClassType.toLowerCase();

    return levelMatch && typeMatch;
  });

  const searchFilteredCourses = searchTerm ? searchResults : filteredCourses;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchFilteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(searchFilteredCourses.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-t-blue-500 h-12 w-12"></div>
      </div>
    );
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
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by Name..."
                  className="border-2 rounded-full border-[#73daa4] p-0 ps-4 me-1 focus:outline-none placeholder:text-sm font-semibold"
                />
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none absolute inset-y-0 right-4 my-auto"
                  style={{ fontSize: "1.2rem" }}
                >
                  &times;
                </button>
              </form>
            ) : (
              <MdOutlineSearch
                className="w-6 h-6 primary-text cursor-pointer"
                onClick={handleSearchClick}
              />
            )}
          </div>
        </div>
        <div
          className={`flex justify-end gap-4 mb-4 ${
            filterDropdownVisible ? "" : "hidden"
          }`}
        >
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
              Tipe Kelas:
            </label>
            <select
              className="mt-1 block w-32 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 rounded-md shadow-sm"
              onChange={(e) => handleFilterChange("classType", e.target.value)}
              value={selectedClassType}
            >
              <option value="">All</option>
              <option value="premium">Premium</option>
              <option value="free">Free</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[#EBF3FC] on-primary-text text-sm font-normal">
              <tr className="h-12">
                <th className="px-3 py-2">Kode Kelas</th>
                <th className="px-3 py-2">Kategori</th>
                <th className="px-3 py-2">Nama Kelas</th>
                <th className="px-3 py-2">Tipe Kelas</th>
                <th className="px-3 py-2">Level</th>
                <th className="px-4 py-2">Harga Kelas</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr className="h-12">
                  <td colSpan="7" className="text-center text-red-500 mt-4">
                    Tidak ada data yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                currentItems.map((course) => (
                  <tr className="h-12 text-left" key={course.id}>
                    <td className="text-center text-xs font-medium text-[#4E5566] px-3 py-2">
                      {course.classCode}
                    </td>
                    <td className="text-center text-xs font-medium text-[#4E5566] px-3 py-2">
                      {course?.Category?.name}
                    </td>
                    <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                      {course.name}
                    </td>
                    {course.type === "Free" ? (
                      <td className="text-xs text-center font-bold text-dark-green uppercase pr-2">
                        {course.type}
                      </td>
                    ) : (
                      <td className="text-xs text-center font-bold text-dark-blue uppercase pr-2">
                        {course.type}
                      </td>
                    )}
                    <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                      {course.level}
                    </td>
                    <td className="text-center text-xs font-medium text-[#4E5566] px-3 py-2">
                      Rp {course.price}
                    </td>
                    <td className="text-center text-xs font-bold px-10">
                      <div className="flex gap-2">
                        <Link to={`/course/${course.id}/chapter`}>
                          <button className="bg-blue-500 px-2 py-1 rounded-md text-white mb-1">
                            Chapter
                          </button>
                        </Link>
                        <button
                          className="primary px-2 py-1 rounded-md text-white mb-1"
                          onClick={() => handleUpdateClick(course.id)}
                        >
                          Edit
                        </button>
                        <Link to={`/course/${course.id}`}>
                          <button className="bg-gray-400 py-1.5 px-2 rounded-md text-white mb-1">
                            <FaRegEye />
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 px-2 rounded-md text-white"
                          onClick={() => deleteCourseHandler(course.id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-7 gap-4">
        <button
          className={`flex items-center px-2 py-1 mx-1 rounded-md text-sm font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack className="inline-block mr-4" />
          Previous
        </button>
        <button
          className={`flex items-center px-2 py-1 mx-1 rounded-md text-sm font-semibold ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <IoIosArrowForward className="inline-block ml-4" />
        </button>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        categories={category}
      />
      <UpdateCourse
        showModal={updateModal}
        setShowModal={setUpdateModal}
        courseId={courseIdToUpdate}
        categories={category}
      />
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
