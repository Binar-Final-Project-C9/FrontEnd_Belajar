import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoDiamondOutline } from "react-icons/io5";
import {
  FaArrowAltCircleLeft,
  FaStar,
  FaShieldAlt,
  FaBookOpen,
} from "react-icons/fa";
import { useFetchCourseByIdQuery } from "../service/courseApi";
import { setCourseById } from "../slices/courseSlice";
import { useParams, Link } from "react-router-dom";
import "../colors.module.css";

const Course = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: course, isError, isLoading } = useFetchCourseByIdQuery(id);

  const selectedCourse = useSelector((state) => state.course.item);

  useEffect(() => {
    if (course) {
      dispatch(setCourseById(course));
    }
  }, [dispatch, course]);

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
        <div className="container flex gap-3 mt-4 mb-6">
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
                <h3 className="text-lg font-semibold mb-2">
                  Modul {module.noModule}: {module.name}
                </h3>
                <p>Durasi Modul: {module.duration}</p>
                <p>Deskripsi Modul: {module.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div >
  );
};

export default Course;
