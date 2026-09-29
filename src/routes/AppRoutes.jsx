import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomeRoute from "./HomeRoute"; // Import the new wrapper component
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Me from "../pages/Auth/Me";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

import CandidateDashboard from "../pages/Candidate/Dashboard";
import Profile from "../pages/Candidate/Profile";
import SearchJobs from "../pages/Candidate/SearchJobs";
import JobDetails from "../pages/Candidate/JobDetails";
import AppliedJobs from "../pages/Candidate/AppliedJobs";
import Resume from "../pages/Candidate/Resume";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeRoute />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={["candidate"]} />}>
            <Route
              path="/candidate/dashboard"
              element={<CandidateDashboard />}
            />

            <Route path="/candidate/profile" element={<Profile />} />

            <Route path="/candidate/applied-jobs" element={<AppliedJobs />} />

            <Route path="/candidate/resume" element={<Resume />} />

            <Route path="/me" element={<Me />} />
          </Route>
        </Route>

        <Route path="/jobs" element={<SearchJobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
