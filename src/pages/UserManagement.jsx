// src/pages/superadmin/UserManagement.jsx
import { useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Super Admin",
      email: "admin@gov.local",
      role: "SUPER_ADMIN",
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  /* ===== HANDLE INPUT ===== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===== CREATE USER ===== */
  const handleCreateUser = () => {
    if (!form.name || !form.email || !form.password || !form.role) {
      alert("All fields are required");
      return;
    }

    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        status: "Active",
      },
    ]);

    setForm({ name: "", email: "", password: "", role: "" });
  };

  /* ===== TOGGLE STATUS ===== */
  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Disabled" : "Active",
            }
          : u
      )
    );
  };

  /* ===== DELETE USER ===== */
  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {/* CREATE USER */}
      <div className="bg-white p-6 rounded border mb-6">
        <h3 className="font-medium mb-4">Create User</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="name"
            placeholder="Name"
            className="border px-3 py-2 rounded"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="border px-3 py-2 rounded bg-blue-50"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded bg-blue-50"
            value={form.password}
            onChange={handleChange}
          />

          <select
            name="role"
            className="border px-3 py-2 rounded"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>

        <button
          onClick={handleCreateUser}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </div>

      {/* USER TABLE */}
      <div className="bg-white rounded border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => toggleStatus(u.id)}
                    className="text-blue-600 mr-3"
                  >
                    {u.status === "Active" ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
