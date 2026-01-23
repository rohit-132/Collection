import { useState } from "react";

export default function Departments() {
  // FRONTEND ONLY DATA
  const [departments, setDepartments] = useState([
    { _id: "1", name: "Education" },
    { _id: "2", name: "Health" },
    { _id: "3", name: "Social Welfare" }
  ]);

  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;

    setDepartments((prev) => [
      ...prev,
      { _id: Date.now().toString(), name }
    ]);

    setName("");
  };

  const handleDelete = (id) => {
    setDepartments((prev) =>
      prev.filter((dept) => dept._id !== id)
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Departments</h2>

      {/* ADD DEPARTMENT */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Department name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="border rounded">
        <div className="bg-gray-100 px-4 py-2 font-semibold flex justify-between">
          <span>Name</span>
          <span>Action</span>
        </div>

        {departments.length === 0 ? (
          <div className="px-4 py-4 text-gray-500">
            No departments found
          </div>
        ) : (
          departments.map((dept) => (
            <div
              key={dept._id}
              className="px-4 py-2 border-t flex justify-between items-center"
            >
              <span>{dept.name}</span>
              <button
                onClick={() => handleDelete(dept._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
