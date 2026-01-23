import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const role = localStorage.getItem("role"); // SUPER_ADMIN | ADMIN

  const navClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm transition ${
      isActive
        ? "bg-blue-600 text-white font-medium"
        : "text-white/90 hover:bg-white/10"
    }`;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <aside className="w-64 bg-[#0f2a44] text-white flex flex-col">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-white/10">
          <h1
            className="text-lg font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {role === "SUPER_ADMIN" ? "Super Admin Panel" : "Admin Panel"}
          </h1>
          <p className="text-xs text-white/70">
            Maharashtra Government
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

          {/* DASHBOARD */}
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>

          {/* SUPER ADMIN SECTION */}
          {role === "SUPER_ADMIN" && (
            <>
              <div className="my-3 border-t border-white/10" />
              <p className="px-4 text-xs font-semibold text-white/60 mb-1">
                Super Admin
              </p>

              <NavLink to="/role-management" className={navClass}>
                Role Management
              </NavLink>

              <NavLink to="/user-management" className={navClass}>
                User Management
              </NavLink>
            </>
          )}

          <div className="my-3 border-t border-white/10" />

          {/* LOCATION MASTER */}
          <p className="px-4 text-xs font-semibold text-white/60 mb-1">
            Location Master
          </p>

          <NavLink to="/regions" className={navClass}>
            Regions
          </NavLink>

          <NavLink to="/divisions" className={navClass}>
            Divisions
          </NavLink>

          <NavLink to="/districts" className={navClass}>
            Districts
          </NavLink>

          <NavLink to="/talukas" className={navClass}>
            Talukas
          </NavLink>

          <div className="my-3 border-t border-white/10" />

          {/* SCHEME SECTION */}
          <p className="px-4 text-xs font-semibold text-white/60 mb-1">
            Scheme Management
          </p>

          <NavLink to="/departments" className={navClass}>
            Departments
          </NavLink>

          <NavLink to="/schemes" className={navClass}>
            Schemes
          </NavLink>

          <NavLink to="/scheme-definition" className={navClass}>
            Scheme Definition
          </NavLink>

          <NavLink to="/scheme-answer" className={navClass}>
            Scheme Answer
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="mt-auto py-4 border-t border-white/10 flex justify-center">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="min-w-[140px] px-6 py-2 bg-red-500 hover:bg-red-600 rounded-md"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to logout?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
