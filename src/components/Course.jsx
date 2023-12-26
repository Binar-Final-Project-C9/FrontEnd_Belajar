import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import {
  FaArrowAltCircleLeft,
  FaStar,
  FaShieldAlt,
  FaBookOpen,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useFetchCourseByIdQuery } from "../service/courseApi";
import { useDeleteModuleMutation } from "../service/moduleApi";
import { setCourseById } from "../slices/courseSlice";
import { removeModule } from "../slices/moduleSlice";
import ModalModule from "./ModalModule";
import UpdateModule from "./UpdateModule";
import { useParams, Link } from "react-router-dom";
import "../colors.module.css";

const Course = () => {
  const [showModalModule, setShowModalModule] = useState(false);
  const [updateModalModule, SetUpdateModalModule] = useState(false);
  const [moduleIdToUpdate, setModuleIdToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: course, isError, isLoading } = useFetchCourseByIdQuery(id);
  const [deleteModuleMutation] = useDeleteModuleMutation();

  const selectedCourse = useSelector((state) => state.course.item);

  useEffect(() => {
    if (course) {
      dispatch(setCourseById(course));
    }
  }, [dispatch, course]);

  const deleteModuleHandler = async (moduleId) => {
    try {
      setShowDeleteModal(true);
      setModuleIdToDelete(moduleId);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  const confirmDeleteHandler = async () => {
    try {
      await deleteModuleMutation(moduleIdToDelete).unwrap();
      setShowDeleteModal(false);
      dispatch(removeModule(moduleIdToDelete));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const handleUpdateClick = (moduleId) => {
    setModuleIdToUpdate(moduleId);
    SetUpdateModalModule(true);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <div className="container mx-auto ">
      <Link
        to="/course"
        className="flex primary-text font-medium mb-2 text-lg items-center ms-3"
      >
        <FaArrowAltCircleLeft className="me-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out" />
        <button className="primary-text py-2 px-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out">
          Back to Course
        </button>
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex justify-between">
          <h3 className="text-3xl font-bold">{selectedCourse.name}</h3>
          <div className="flex items-center me-4">
            <FaStar className="text-yellow-300 me-2" />
            <p className="font-semibold">5.0</p>
          </div>
        </div>
        <p className="font-semibold text-md">by {selectedCourse.courseBy}</p>
        <div className="container gap-3 mt-4 mb-6">
          <div className="container flex gap-3 mt-4 mb-6">
            <div className="flex items-center gap-3 secondary text-white px-3 rounded-full">
              <FaBookOpen />
              <p className="font-semibold">{selectedCourse.classCode}</p>
            </div>
            <div className="flex items-center bg-emerald-400 px-3 text-white rounded-full gap-3">
              <FaShieldAlt />
              <p className="font-semibold">{selectedCourse.level}</p>
            </div>
            <div className="flex items-center gap-3 bg-dark-blue px-3 text-white rounded-full">
              <IoDiamondOutline />
              <p className="font-semibold">{selectedCourse.type}</p>
            </div>
          </div>
          <div>
            <div>
              <img
                src={selectedCourse.imageUrl}
                alt=""
                className="rounded-lg mb-4"
              />
            </div>
            <div className="mb-6">
              <p className="font-bold text-md">Tentang Kelas</p>
              <p className="text-sm">{selectedCourse.description}</p>
              {/* <p>Benefit Course: {selectedCourse.benefits}</p> */}
            </div>
            <div>
              <p className="font-bold text-md mb-2">Harga Kelas</p>
              <p className="bg-blue-400 text-white rounded-full inline-block px-6 text-sm">
                Rp : {selectedCourse.price}
              </p>
            </div>
          </div>
        </div>

        {selectedCourse?.Chapters?.map((chapter) => (
          <div key={chapter.id} className="mb-8 mt-10">
            <h2 className="text-xl font-bold mb-2">
              Chapter {chapter.noChapter}: {chapter.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapter?.Modules?.map((module) => (
                <div
                  key={module.id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-md font-semibold mb-2">
                    Modul {module.noModule} : {module.name}
                  </h3>
                  <div className="text-sm mt-5">
                    <p>Durasi Modul : {module.duration}</p>
                    <p>Deskripsi Modul : {module.description}</p>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button
                      className="bg-red-500 px-3 text-sm py-0.5 rounded-md text-white"
                      onClick={() => deleteModuleHandler(module.id)}
                    >
                      Hapus
                    </button>
                    <button
                      className="bg-green-500 px-3 text-sm rounded-md text-white
                    "
                      onClick={() => handleUpdateClick(module.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                className="flex text-white items-center justify-center primary rounded-full px-3 font-medium gap-2 py-[2px]"
                onClick={() => setShowModalModule(true)}
              >
                <FiPlusCircle />
                Tambah Modul
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalModule
        showModalModule={showModalModule}
        setShowModalModule={setShowModalModule}
      />
      <UpdateModule
        showModalModule={updateModalModule}
        setshowModalModule={SetUpdateModalModule}
        moduleId={moduleIdToUpdate}
      />
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-96">
            <div className="flex items-center justify-center mb-2">
              <FaExclamationTriangle className="text-red-500 w-8 h-8" />
            </div>
            <p className="text-md font-medium text-center mb-10">
              Apakah Anda yakin ingin menghapus modul ini?
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
    </div>
  );
};

export default Course;
