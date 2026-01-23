// src/pages/user/UserSchemeAnswer.jsx
import { useState } from "react";
import { FileDown, FileUp, Send, Trash2, Edit } from "lucide-react";

export default function UserSchemeAnswer() {
  const schemes = [
    {
      id: "1",
      name: "Test Scheme 1",
      descriptions: [
        "Financial assistance for eligible applicants",
        "Special support for rural citizens",
      ],
      fields: [
        { key: "fullName", label: "Full Name", required: true },
        { key: "email", label: "Email", required: true },
      ],
    },
    {
      id: "2",
      name: "Test Scheme 2",
      descriptions: [
        "Educational support scheme for students",
        "Merit-based scholarship assistance",
      ],
      fields: [
        { key: "fullName", label: "Full Name", required: true },
        { key: "email", label: "Email", required: true },
      ],
    },
  ];

  const [selectedSchemeId, setSelectedSchemeId] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [answers, setAnswers] = useState({});
  const [applications, setApplications] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editSchemeId, setEditSchemeId] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const selectedScheme = schemes.find(
    (s) => s.id === selectedSchemeId
  );

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!selectedScheme) return;

    for (const f of selectedScheme.fields) {
      if (f.required && !answers[f.key]) {
        alert(`${f.label} is required`);
        return;
      }
    }

    if (!selectedDescription) {
      alert("Please select scheme description");
      return;
    }

    setApplications((prev) => [
      ...prev,
      {
        id: Date.now(),
        userName: answers.fullName,
        schemeId: selectedScheme.id,
        schemeName: selectedScheme.name,
        schemeDescription: selectedDescription,
        updated: false,
      },
    ]);

    setAnswers({});
    setSelectedSchemeId("");
    setSelectedDescription("");
  };

  /* ================= EDIT ================= */
  const startEdit = (app) => {
    if (app.updated) {
      alert("You can update only once");
      return;
    }
    setEditId(app.id);
    setEditSchemeId(app.schemeId);
    setEditDescription(app.schemeDescription);
  };

  const saveEdit = () => {
    const scheme = schemes.find(
      (s) => s.id === editSchemeId
    );

    setApplications((prev) =>
      prev.map((a) =>
        a.id === editId
          ? {
              ...a,
              schemeId: scheme.id,
              schemeName: scheme.name,
              schemeDescription: editDescription,
              updated: true,
            }
          : a
      )
    );

    setEditId(null);
    setEditSchemeId("");
    setEditDescription("");
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setApplications((prev) =>
      prev.filter((a) => a.id !== id)
    );
  };

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        Scheme Answer
      </h1>
      <p className="text-gray-600 mb-6">
        Fill and submit scheme application details
      </p>

      {/* SELECT SCHEME */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          className="border px-4 py-2 rounded-lg w-80"
          value={selectedSchemeId}
          onChange={(e) => {
            setSelectedSchemeId(e.target.value);
            setSelectedDescription("");
            setAnswers({});
          }}
        >
          <option value="">Select Scheme</option>
          {schemes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded">
          <FileDown size={16} /> Export Template
        </button>

        <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded">
          <FileUp size={16} /> Import Excel
        </button>
      </div>

      {/* SELECT DESCRIPTION */}
      {selectedScheme && (
        <div className="mb-6 max-w-3xl">
          <label className="block font-medium mb-2">
            Scheme Description <span className="text-red-600">*</span>
          </label>
          <select
            className="border px-4 py-2 rounded-lg w-full"
            value={selectedDescription}
            onChange={(e) =>
              setSelectedDescription(e.target.value)
            }
          >
            <option value="">Select Description</option>
            {selectedScheme.descriptions.map(
              (desc, idx) => (
                <option key={idx} value={desc}>
                  {desc}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {/* FORM */}
      {selectedScheme && (
        <div className="bg-white border rounded-2xl shadow-sm p-8 max-w-3xl mb-10">
          {selectedScheme.fields.map((f) => (
            <div key={f.key} className="mb-4">
              <label className="block font-medium mb-1">
                {f.label} *
              </label>
              <input
                className="border px-4 py-2 rounded-lg w-full"
                value={answers[f.key] || ""}
                onChange={(e) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [f.key]: e.target.value,
                  }))
                }
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            <Send size={16} /> Submit
          </button>
        </div>
      )}

      {/* TABLE */}
      {applications.length > 0 && (
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b font-semibold">
            Submitted Applications
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">
                  User Name
                </th>
                <th className="text-left px-4 py-2">
                  Scheme
                </th>
                <th className="text-left px-4 py-2">
                  Description
                </th>
                <th className="text-center px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="px-4 py-2">
                    {app.userName}
                  </td>
                  <td className="px-4 py-2">
                    {app.schemeName}
                  </td>
                  <td className="px-4 py-2">
                    {app.schemeDescription}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      onClick={() => startEdit(app)}
                      className={`flex items-center gap-1 ${
                        app.updated
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-blue-600"
                      }`}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(app.id)
                      }
                      className="text-red-600 flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT MODAL */}
      {editId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Update Scheme (One Time)
            </h3>

            <label className="block mb-2 font-medium">
              Scheme Name
            </label>
            <select
              className="border px-3 py-2 rounded w-full mb-4"
              value={editSchemeId}
              onChange={(e) =>
                setEditSchemeId(e.target.value)
              }
            >
              {schemes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-medium">
              Scheme Description
            </label>
            <textarea
              className="border px-3 py-2 rounded w-full mb-4"
              rows={3}
              value={editDescription}
              onChange={(e) =>
                setEditDescription(e.target.value)
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditId(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
