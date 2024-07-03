import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Loadable from '../components/Loadable'
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

const GeneralApp = Loadable(
  lazy(() => import("../pages/Home")),
)

const Page404 = Loadable(
  lazy(() => import("../pages/PageNotFound"))
)

const Routers = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<GeneralApp />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Routers;
