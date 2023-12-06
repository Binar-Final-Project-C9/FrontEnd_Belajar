import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = () => {
  const { authInfo } = useSelector((state) => state.auth);
  return authInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default Private;
