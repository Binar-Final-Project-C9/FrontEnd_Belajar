import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetchCourseByIdQuery } from "../service/courseApi";
import { setCourseById } from "../slices/courseSlice";
import { useParams } from "react-router-dom";
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
    <div>
      <div>
        <h2>Nama Course : {selectedCourse.name}</h2>
        <h2>Level Course : {selectedCourse.level}</h2>
        <h2>Deskripsi Course : {selectedCourse.description}</h2>
        <h2>Benefit Course : {selectedCourse.benefits}</h2>
        <h2>Kode Course : {selectedCourse.classCode}</h2>
        <h2>Tipe Course : {selectedCourse.type}</h2>
        <h2>Harga Course : {selectedCourse.price}</h2>
        <h2>Author Course : {selectedCourse.courseBy}</h2>
        <img src={selectedCourse.imageUrl} alt="" />
      </div>

      {selectedCourse?.Chapters?.map((chapter) => (
        <div key={chapter.id} className="mt-4">
          <h2>No Chapter : {chapter.noChapter}</h2>
          <h2>Nama Chapter : {chapter.name}</h2>

          <div>
            {chapter?.Modules?.map((module) => (
              <div key={module.id}>
                <h2>No Modul : {module.noModule}</h2>
                <h2>Nama Modul : {module.name}</h2>
                <h2>Durasi Modul : {module.duration}</h2>
                <h2>Deskripsi Modul : {module.description}</h2>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Course;
