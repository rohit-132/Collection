// src/pages/user/UserDashboard.jsx
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Pencil,
  ArrowRight,
} from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="relative min-h-[calc(100vh-140px)] px-6 py-10 max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <header className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          User Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Maharashtra Government Scheme Portal
        </p>
      </header>

      {/* CONTENT */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN SERVICE CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <ClipboardList className="text-blue-700" size={30} />
            <h2 className="text-xl font-semibold text-gray-900">
              Scheme Application Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* APPLY FOR SCHEME */}
            <div className="relative border rounded-xl p-6 bg-gray-50 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <Pencil className="text-blue-700" />
                <h3 className="font-semibold text-lg text-gray-900">
                  Apply for Scheme
                </h3>
              </div>

              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                Fill and submit the official application form for the selected
                Maharashtra Government welfare scheme.
              </p>

              <Link
                to="/user/schemes"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-md font-semibold"
              >
                Proceed to Application <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
