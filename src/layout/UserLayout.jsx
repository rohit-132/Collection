// src/layout/UserLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

// ✅ IMPORT FOOT LOGO
import footLogo from "../assets/foot-logo.png";

export default function UserLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f9] relative">
      {/* HEADER */}
      <PublicHeader />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ✅ FOOT LOGO (FIXED PATH) */}
      <img
        src={footLogo}
        alt="Footer Logo"
        className="absolute right-3 bottom-1 w-28 opacity-90"
      />

      {/* FOOTER */}
      <PublicFooter />
    </div>
  );
}
