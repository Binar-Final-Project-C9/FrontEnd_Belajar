import { BiGroup } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCoursesQuery } from "../service/courseApi";
import { setCourse } from "../slices/courseSlice";
import { useEffect } from "react";
import { useFetchUserQuery } from "../service/userApi";
import { setUser } from "../slices/userSlice";
import "../colors.module.css";

const StatCard = ({ color, value, label }) => {
  return (
    <div
      className={`min-w-full mx-auto flex items-center justify-center ${color} text-white gap-4 rounded-2xl`}
      style={{ height: "120px" }}
    >
      <div className="flex items-center justify-center">
        <BiGroup className="w-12 h-12 bg-white rounded-2xl text-[#6148FF] p-1" />
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-normal font-inter">{value}</p>
        <h1 className="text-md font-semibold font-montserrat">{label}</h1>
      </div>
    </div>
  );
};

const Card = () => {
  const dispatch = useDispatch();

  const { data: courseData, isError, isLoading } = useFetchCoursesQuery();

  const { data: userData } = useFetchUserQuery();

  const users = useSelector((state) => state.user.items);

  const courses = useSelector((state) => state.course.items);

  useEffect(() => {
    if (courseData) {
      dispatch(setCourse(courseData));
    }
  }, [dispatch, courseData]);

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [dispatch, userData]);

  const premiumClasses = courses.filter((course) => course.type === "Premium");

  const activeUSer = users.filter((user) => user.verify === true);

  return (
    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
      <StatCard
        color="bg-light-blue"
        value={activeUSer.length}
        label="Active Users"
      />
      <StatCard
        color="bg-dark-green"
        value={courses.length}
        label="Active Class"
      />
      <StatCard
        color="bg-dark-blue"
        value={premiumClasses.length}
        label="Premium Class"
      />
    </div>
  );
};

export default Card;
