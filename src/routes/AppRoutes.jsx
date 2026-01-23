import { Routes, Route, Navigate } from "react-router-dom";

// public
import Login from "../pages/Login";
import UserRegister from "../pages/user/UserRegister";

// admin / super admin layout
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Schemes from "../pages/Schemes";
import SchemeDefinition from "../pages/SchemeDefinition";
import SchemeAnswer from "../pages/SchemeAnswer";
import Departments from "../pages/Departments";

// ✅ SUPER ADMIN PAGES
import RoleManagement from "../pages/RoleManagement";
import UserManagement from "../pages/UserManagement";


// user pages
import UserLayout from "../layout/UserLayout";
import UserDashboard from "../pages/user/UserDashboard";
import UserSchemeAnswer from "../pages/user/UserSchemeAnswer";

// common masters
import Regions from "../pages/common/Regions";
import Divisions from "../pages/common/Divisions";
import Districts from "../pages/common/Districts";
import Talukas from "../pages/common/Talukas";

export default function AppRoutes() {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* ADMIN + SUPER ADMIN */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* SUPER ADMIN ONLY */}
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/user-management" element={<UserManagement />} />

        {/* ADMIN PAGES */}
        <Route path="/departments" element={<Departments />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/scheme-definition" element={<SchemeDefinition />} />
        <Route path="/scheme-answer" element={<SchemeAnswer />} />

        {/* COMMON MASTERS */}
        <Route path="/regions" element={<Regions />} />
        <Route path="/divisions" element={<Divisions />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/talukas" element={<Talukas />} />
      </Route>

      {/* USER */}
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/schemes" element={<UserSchemeAnswer />} />
      </Route>
    </Routes>
  );
}
