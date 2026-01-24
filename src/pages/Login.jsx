import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicHeader from "../components/PublicHeader";
import PublicFooter from "../components/PublicFooter";

import mahaMap from "../assets/maharashtra-map.png";
import footLogo from "../assets/foot-logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("superadmin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSuperAdminLogin = (e) => {
    e.preventDefault();

    // 🔐 SUPER ADMIN (hardcoded – frontend demo)
    if (email === "admin@gov.local" && password === "Admin@123") {
      localStorage.setItem("role", "SUPER_ADMIN");
      navigate("/dashboard");
      return;
    }

    // 👤 NORMAL ADMIN (created by Super Admin)
    localStorage.setItem("role", "ADMIN");
    navigate("/dashboard");
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("role", "USER");
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f9] relative">
      <PublicHeader />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* MAP */}
          <div className="flex justify-center">
            <img
              src={mahaMap}
              alt="Maharashtra Map"
              className="w-[620px] max-w-full object-contain brightness-110 contrast-110"
            />
          </div>

          {/* LOGIN CARD */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-6">
              {/* TABS */}
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setActiveTab("superadmin")}
                  className={`flex-1 py-2 text-sm font-bold ${
                    activeTab === "superadmin"
                      ? "border-b-2 border-blue-700 text-blue-700"
                      : "text-gray-500"
                  }`}
                >
                  SUPER ADMIN LOGIN
                </button>
                <button
                  onClick={() => setActiveTab("user")}
                  className={`flex-1 py-2 text-sm font-bold ${
                    activeTab === "user"
                      ? "border-b-2 border-blue-700 text-blue-700"
                      : "text-gray-500"
                  }`}
                >
                  USER LOGIN
                </button>
              </div>

              {/* SUPER ADMIN */}
              {activeTab === "superadmin" && (
                <form onSubmit={handleSuperAdminLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Official Email ID"
                    className="w-full border px-4 py-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-4 py-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button className="w-full bg-blue-700 text-white py-2 rounded font-semibold">
                    Sign In
                  </button>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    Authorized access only. Unauthorized use of this system is
                    prohibited and may be subject to disciplinary.
                  </p>
                </form>
              )}

              {/* USER */}
              {activeTab === "user" && (
                <form onSubmit={handleUserLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Registered Email"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-4 py-2 rounded"
                    required
                  />
                  <button className="w-full bg-blue-700 text-white py-2 rounded font-semibold">
                    Sign In
                  </button>
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    This portal is intended for registered beneficiaries only.
                    Please ensure your credentials are kept confidential.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOT LOGO */}
      <img
        src={footLogo}
        alt="Footer Logo"
        className="absolute right-3 bottom-1 w-28 opacity-90"
      />

      <PublicFooter />
    </div>
  );
}
