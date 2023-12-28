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
                <th className="px-3 py-2">Vidio URL</th>
                <th className="px-3 py-2">isUnlocked</th>
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
                    <td className="text-center text-xs font-bold px-3 py-2">
                      <button
                        className="bg-green-500 px-2 py-1 rounded-md text-white"
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
      {/* {showModal && (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 overflow-y-auto">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto mx-auto max-w-6xl max-h-screen">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                <div className="flex items-start justify-between p-2">
                  <button
                    className="p-1 ml-auto border-0 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(false)}>
                    <HiX className="text-black" />
                  </button>
                </div>
                <form
                  className="w-full px-6 space-y-4"
                  onSubmit={submitHandler}>
                  <h2 className="text-center font-bold text-gray-800">
                    Tambah Kelas
                  </h2>
                  <InputField
                    label="Video"
                    value={
                      videoOption === 'file'
                        ? courseData.video
                        : courseData.videoUrl
                    }
                    id="video"
                    type={videoOption === 'file' ? 'file' : 'text'}
                    placeholder={
                      videoOption === 'file'
                        ? 'Upload Video File'
                        : 'Enter Video URL'
                    }
                    onChange={handleInputChange}
                  />
                  <div className="flex items-center space-x-2">
                    <label>
                      <input
                        type="radio"
                        value="file"
                        checked={videoOption === 'file'}
                        onChange={handleVideoOptionChange}
                      />
                      Upload File
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="url"
                        checked={videoOption === 'url'}
                        onChange={handleVideoOptionChange}
                      />
                      Video URL
                    </label>
                  </div>
                </form>
                <div className="flex items-center justify-between p-5 gap-5 w-full">
                  <button
                    className="bg-dark-blue text-white w-full font-bold text-sm h-[50px] rounded-3xl"
                    type="submit">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )} */}
    </>
  );
};

export default Module;
