import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./theme.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Private from "./private/Private.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import Class from "./components/Class.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import { Provider } from "react-redux";
import store from "./store.jsx";
import Course from "./components/Course.jsx";
import Chapter from "./components/Chapter.jsx";
import User from "./components/User.jsx";
import Module from "./components/Module.jsx";
import Notification from "./components/Notification.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Login />} />
      <Route path="" element={<Private />}>
        <Route path="" element={<Layout />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="course" element={<Class />} />
          <Route path="user" element={<User />} />
          <Route path="notification" element={<Notification />} />
          <Route path="course/:id" element={<Course />} />
          <Route path="course/:id/chapter" element={<Chapter />} />
          <Route path="course/:id/chapter/:idChapter" element={<Module />} />
        </Route>
      </Route>
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
