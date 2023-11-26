import { Route, Routes } from "react-router-dom";
import SidebarHome from "./components/SidebarHome";
import SidebarClass from "./components/SidebarClass";
import Login from "./components/Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<SidebarHome />} />
        <Route path="/course" element={<SidebarClass />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
