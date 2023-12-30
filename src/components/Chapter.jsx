import { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  useFetchChapterByCourseIdQuery,
  useDeleteChapterMutation,
} from "../service/chapterApi";
import { removeChapter, setChapter } from "../slices/chapterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ModalChapter from "./ModalChapter";
import UpdateChapter from "./UpdateChapter";
import Card from "./Card";

const Chapter = () => {
  const [showModalChapter, setShowModalChapter] = useState(false);
  const [updateModalChapter, SetUpdateModalChapter] = useState(false);
  const [chapterIdToUpdate, setChapterIdToUpdate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chapterIdToDelete, setChapterIdToDelete] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [deleteChapterMutation] = useDeleteChapterMutation();

  const {
    data: chapter,
    isError,
    isLoading,
  } = useFetchChapterByCourseIdQuery(id);

  const chapters = useSelector((state) => state.chapter.items);

  const deleteChapterHandler = async (chapterId) => {
    try {
      setShowDeleteModal(true);
      setChapterIdToDelete(chapterId);
    } catch (error) {
      console.error("Error opening delete confirmation modal:", error);
    }
  };

  const confirmDeleteHandler = async () => {
    try {
      await deleteChapterMutation(chapterIdToDelete).unwrap();
      setShowDeleteModal(false);
      dispatch(removeChapter(chapterIdToDelete));
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  useEffect(() => {
    if (chapter) {
      dispatch(setChapter(chapter));
    }
  }, [dispatch, chapter]);

  const handleUpdateClick = (chapterId) => {
    setChapterIdToUpdate(chapterId);
    SetUpdateModalChapter(true);
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error...</div>;

  return (
    <>
      <Link
        to="/course"
        className="flex primary-text font-medium mb-2 text-lg items-center ms-3"
      >
        <FaArrowAltCircleLeft className="me-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out" />
        <button className="primary-text py-2 px-2 hover:text-[#68c092] transition-colors duration-300 ease-in-out">
          Back to Course
        </button>
      </Link>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Kelola Chapter
          </h2>
          <div className="flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center primary rounded-full px-3 font-medium gap-2 py-[2px]"
              onClick={() => setShowModalChapter(true)}
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
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter, index) => (
                <tr className="h-12" key={index}>
                  <td className="text-center text-xs font-bold text-[#4E5566] px-3 py-2">
                    {index + 1}
                  </td>
                  <td className="text-center text-xs font-bold text-[#202244] px-3 py-2">
                    {chapter.name}
                  </td>
                  <td className="text-center text-xs font-bold px-3 py-2">
                    <Link to={`/course/${id}/chapter/${chapter.id}`}>
                      <button className="bg-blue-500 px-2 py-1 rounded-md text-white mr-2">
                        Module
                      </button>
                    </Link>
                    <button
                      className="bg-green-500 px-2 py-1 rounded-md text-white"
                      onClick={() => handleUpdateClick(chapter.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-2 py-1 rounded-md text-white ml-2"
                      onClick={() => deleteChapterHandler(chapter.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ModalChapter
          showModalChapter={showModalChapter}
          setShowModalChapter={setShowModalChapter}
        />
        <UpdateChapter
          showModalChapter={updateModalChapter}
          setshowModalChapter={SetUpdateModalChapter}
          chapterId={chapterIdToUpdate}
        />
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-96">
              <div className="flex items-center justify-center mb-2">
                <FaExclamationTriangle className="text-red-500 w-8 h-8" />
              </div>
              <p className="text-md font-medium text-center mb-10">
                Apakah Anda yakin ingin menghapus chapter ini?
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

export default Chapter;
