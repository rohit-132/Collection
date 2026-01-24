import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

import mahaLogo from "../assets/maha-logo.png";
import maha2Logo from "../assets/maha2-logo.png";
import footLogo from "../assets/foot-logo.png";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-100">

      {/* HEADER (FIXED) */}
      <header className="h-[110px] bg-white border-b border-slate-200 flex items-center px-12 shrink-0">
        <img
          src={mahaLogo}
          className="h-[80px]"
          alt="Maharashtra Logo"
        />

        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Government of Maharashtra
          </h1>
          <p className="text-indigo-600">
            Other Backward Bahujan Welfare Department
          </p>
        </div>

        <img
          src={maha2Logo}
          className="h-[90px]"
          alt="Maharashtra Seal"
        />
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR (NO SCROLL) */}
        <Sidebar />

        {/* MAIN CONTENT (ONLY THIS SCROLLS) */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>

        <img
          src={footLogo}
          alt="Footer Logo"
          className="absolute right-3 bottom-1 w-28 opacity-90"
        />
      </div>

      {/* FOOTER (FIXED) */}
      <footer className="h-[40px] bg-slate-200 text-center text-sm text-gray-700 flex items-center justify-center shrink-0">
        Designed & Developed by
        <span className="ml-1 font-medium text-indigo-700">
          Instalogic Solutions Pvt Ltd
        </span>
      </footer>
    </div>
  );
}
