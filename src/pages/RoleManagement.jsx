// src/pages/superadmin/RoleManagement.jsx
import { useState } from "react";

export default function RoleManagement() {
  const permissionsList = [
    "USER_MANAGE",
    "MASTER_MANAGE",
    "SCHEME_CREATE",
    "SCHEME_EDIT",
    "SCHEME_VIEW",
    "SCHEME_ASSIGN",
    "SCHEME_ANSWER",
    "EXCEL_UPLOAD",
    "EXCEL_EXPORT",
  ];

  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "USER",
      permissions: ["SCHEME_ANSWER", "EXCEL_UPLOAD", "EXCEL_EXPORT"],
    },
  ]);

  const [editId, setEditId] = useState(null);

  /* ===== TOGGLE PERMISSION ===== */
  const togglePermission = (perm) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  /* ===== CREATE / UPDATE ROLE ===== */
  const handleCreateOrUpdate = () => {
    if (!roleName.trim()) {
      alert("Role name is required");
      return;
    }

    if (editId) {
      // UPDATE
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editId
            ? { ...r, name: roleName, permissions: selectedPermissions }
            : r
        )
      );
    } else {
      // CREATE
      setRoles((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: roleName.toUpperCase(),
          permissions: selectedPermissions,
        },
      ]);
    }

    resetForm();
  };

  /* ===== EDIT ROLE ===== */
  const handleEdit = (role) => {
    setEditId(role.id);
    setRoleName(role.name);
    setSelectedPermissions(role.permissions);
  };

  /* ===== DELETE ROLE ===== */
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  /* ===== RESET ===== */
  const resetForm = () => {
    setRoleName("");
    setSelectedPermissions([]);
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Role Management</h2>

      {/* CREATE / EDIT ROLE */}
      <div className="bg-white p-6 rounded border mb-6">
        <h3 className="font-medium mb-3">
          {editId ? "Edit Role" : "Create Role"}
        </h3>

        <input
          placeholder="Role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-4"
        />

        <div className="grid grid-cols-3 gap-4 text-sm">
          {permissionsList.map((p) => (
            <label key={p} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(p)}
                onChange={() => togglePermission(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleCreateOrUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Role" : "Create Role"}
          </button>

          {editId && (
            <button
              onClick={resetForm}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ROLE LIST */}
      <div className="bg-white rounded border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Role</th>
              <th className="text-left px-4 py-2">Permissions</th>
              <th className="text-right px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No roles created
                </td>
              </tr>
            )}

            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-2 font-semibold">{role.name}</td>
                <td className="px-4 py-2">
                  {role.permissions.join(", ")}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-600 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
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
