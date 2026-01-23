import { useEffect, useState } from "react";
import { getSchemes, createScheme } from "../api/scheme.api";

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const loadSchemes = async () => {
    const res = await getSchemes();

    if (Array.isArray(res?.message)) {
      setSchemes(res.message);
    } else {
      setSchemes([]);
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  const saveScheme = async () => {
    if (!name.trim()) return;

    if (editId) {
      // FRONTEND-ONLY EDIT
      setSchemes((prev) =>
        prev.map((s) =>
          s._id === editId
            ? { ...s, name, description }
            : s
        )
      );
      setEditId(null);
    } else {
      await createScheme({ name, description });
      loadSchemes();
    }

    setName("");
    setDescription("");
  };

  const handleEdit = (scheme) => {
    setEditId(scheme._id);
    setName(scheme.name);
    setDescription(scheme.description || "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setDescription("");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Schemes</h1>

      {/* FORM */}
      <div className="bg-white p-4 shadow rounded mb-6 space-y-3">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Scheme name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="border px-3 py-2 rounded w-full"
          placeholder="Scheme description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            onClick={saveScheme}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Scheme" : "Create Scheme"}
          </button>

          {editId && (
            <button
              onClick={cancelEdit}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {schemes.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No schemes created yet
                </td>
              </tr>
            )}

            {schemes.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.description}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleEdit(s)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
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
