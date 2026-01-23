import { useState } from "react";

export default function Districts() {
  const [districts, setDistricts] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    setDistricts(prev => [...prev, { id: Date.now(), name }]);
    setName("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this district?")) return;
    setDistricts(prev => prev.filter(d => d.id !== id));
  };

  const handleEdit = (d) => {
    setEditingId(d.id);
    setEditingName(d.name);
  };

  const handleUpdate = () => {
    if (!editingName.trim()) return;
    setDistricts(prev =>
      prev.map(d =>
        d.id === editingId ? { ...d, name: editingName } : d
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Districts</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter District Name"
          className="border px-3 py-2 rounded w-64"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="border rounded">
        <div className="bg-gray-100 px-4 py-2 font-semibold grid grid-cols-2">
          <span>District Name</span>
          <span className="text-right">Actions</span>
        </div>

        {districts.length === 0 ? (
          <div className="px-4 py-4 text-gray-500">No districts found</div>
        ) : (
          districts.map(d => (
            <div
              key={d.id}
              className="px-4 py-2 border-t grid grid-cols-2 items-center"
            >
              {editingId === d.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border px-2 py-1 rounded w-60"
                />
              ) : (
                <span>{d.name}</span>
              )}

              <div className="flex justify-end gap-2">
                {editingId === d.id ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(d)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
