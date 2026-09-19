import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Me from "../pages/Auth/Me";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={["candidate"]} />}>
            <Route path="/me" element={<Me />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
