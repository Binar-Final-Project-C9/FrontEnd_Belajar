import { Route, Routes } from "react-router-dom";
import SidebarHome from "./components/SidebarHome";
import SidebarClass from "./components/SidebarClass";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<SidebarHome />} />
        <Route path="/course" element={<SidebarClass />} />
      </Routes>
    </>
  );
}

export default App;
