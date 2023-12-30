import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { useFetchChapterByIdQuery } from "../service/chapterApi";
import { useDeleteModuleMutation } from "../service/moduleApi";
import { removeModule, setModule } from "../slices/moduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Card from "./Card";
import ModalModule from "./ModalModule";
import UpdateModule from "./UpdateModule";

const Module = () => {
  const [showModalModule, setShowModalModule] = useState(false);
  const [updateModalModule, SetUpdateModalModule] = useState(false);
  const [moduleIdToUpdate, setModuleIdToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState(null);

  const { id, idChapter } = useParams();
  const dispatch = useDispatch();
  const [deleteModuleMutation] = useDeleteModuleMutation();
  const {
    data: chapter,
    isError,
    isLoading,
  } = useFetchChapterByIdQuery(idChapter);

  const modules = useSelector((state) => state.module.items);
  // const modules = [];
  const deleteChapterHandler = async (moduleId) => {
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
      // window.location.reload();
      dispatch(removeModule(moduleIdToDelete));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  useEffect(() => {
    if (chapter) {
      dispatch(
        setModule({
          data: {
            modules: chapter.data.chapter.Modules,
          },
        })
      );
    }
  }, [dispatch, chapter]);

  const handleUpdateClick = (moduleId) => {
    setModuleIdToUpdate(moduleId);
    SetUpdateModalModule(true);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <>
      <Link
        to={`/course/${id}/chapter`}
        className="flex primary-text font-medium mb-2 text-lg items-center ms-3"
      >
        <FaArrowAltCircleLeft className="me-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out" />
        <button className="primary-text py-2 px-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out">
          Back to Chapter
        </button>
      </Link>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Kelola Module
          </h2>
          <div className="flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center primary rounded-full px-3 font-medium gap-2 py-[2px]"
              onClick={() => setShowModalModule(true)}
            >
              <FiPlusCircle />
              Tambah
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-[#EBF3FC] on-primary-text text-sm font-normal">
              <tr className="h-12">
                <th className="px-3 py-2">No</th>
                <th className="px-3 py-2">Nama Chapter</th>
                <th className="px-3 py-2">Deskripsi</th>
                <th className="px-3 py-2">Video URL</th>
                <th className="px-3 py-2">Tipe Modul</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {modules &&
                modules.map((module, index) => (
                  <tr className="h-12" key={index}>
                    <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
                      {module.noModule}
                    </td>
                    {/* <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
                      {index + 1}
                    </td> */}
                    <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                      {module.name}
                    </td>
                    <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                      {module.description}
                    </td>
                    <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                      <Link
                        to={module.videoUrl}
                        target="_blank"
                        className="hover:text-blue-500"
                      >
                        {module.videoUrl}
                      </Link>
                    </td>
                    <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                      {module.isUnlocked ? (
                        <span className="text-green-500">TIDAK TERKUNCI</span>
                      ) : (
                        <span className="text-red-500">TERKUNCI</span>
                      )}
                    </td>
                    <td className="flex text-center text-xs font-bold px-3 py-2">
                      <button
                        className="bg-green-500 px-4 py-1 mx-1 rounded-md text-white"
                        onClick={() => handleUpdateClick(module.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 px-2 py-1 rounded-md text-white ml-2"
                        onClick={() => deleteChapterHandler(module.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <ModalModule
          showModalModule={showModalModule}
          setShowModalModule={setShowModalModule}
        />
        <UpdateModule
          showModalModule={updateModalModule}
          setShowModalModule={SetUpdateModalModule}
          moduleId={moduleIdToUpdate}
        />
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-96">
              <div className="flex items-center justify-center mb-2">
                <FaExclamationTriangle className="text-red-500 w-8 h-8" />
              </div>
              <p className="text-md font-medium text-center mb-10">
                Apakah Anda yakin ingin menghapus module ini?
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
    </>
  );
};

export default Module;
