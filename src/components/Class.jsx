import { useState, useEffect } from 'react';
import { FiFilter, FiPlusCircle } from 'react-icons/fi';
import { MdOutlineSearch } from 'react-icons/md';
import Modal from './Modal';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchCoursesQuery,
  useDeleteCourseMutation,
} from '../service/courseApi';
import { setCourse, removeCourse } from '../slices/courseSlice';

const Class = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { data: courseData, isError, isLoading } = useFetchCoursesQuery();

  const [deleteCourseMutation] = useDeleteCourseMutation();

  const deleteCourseHandler = async (courseId) => {
    try {
      await deleteCourseMutation(courseId).unwrap();
      dispatch(removeCourse(courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const courses = useSelector((state) => state.course.items);

  useEffect(() => {
    if (courseData) {
      dispatch(setCourse(courseData));
    }
  }, [dispatch, courseData]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center">Error...</div>;
  }

  return (
    <>
      <Card />
      <div>
        <div className="py-3 mx-auto lg:flex text-center items-center justify-between">
          <h2 className="font-bold text-base mb-4 font-montserrat">
            Kelola Kelas
          </h2>
          <div className=" flex items-center justify-between gap-3">
            <button
              className="flex text-white items-center justify-center bg-dark-blue rounded-full px-4 font-bold gap-2 py-[2px]"
              onClick={() => setShowModal(true)}>
              <FiPlusCircle />
              Tambah
            </button>
            <button className="flex items-center justify-center text-dark-blue border-dark-blue border-2 rounded-full px-4 font-bold gap-2">
              <FiFilter />
              Filter
            </button>
            <MdOutlineSearch className="w-7 h-7 text-dark-blue" />
          </div>
        </div>
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
              {courses.map((course, index) => (
                <tr className="h-12 text-left" key={index}>
                  <td className="text-xs font-bold text-[#4E5566] ps-3">
                    {course.classCode}
                  </td>
                  <td className="text-xs font-bold text-[#4E5566]">
                    {course?.Category?.name}
                  </td>
                  <td className="text-xs font-bold text-[#202244] py-2">
                    {course.name}
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
                    <button className="bg-dark-blue p-1 rounded-xl w-16 text-white mr-2">
                      Ubah
                    </button>
                    <button
                      className="bg-red-500 p-1 rounded-xl w-16 text-white"
                      onClick={() => deleteCourseHandler(course.id)}>
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
    </>
  );
};

export default Class;
