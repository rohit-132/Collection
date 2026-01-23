import { useState } from "react";

export default function SchemeAnswer() {
  // Dummy schemes (frontend only)
  const schemes = [
    { id: "all", name: "All Schemes" },
    { id: "1", name: "Test Scheme 1" },
    { id: "2", name: "Test Scheme 2" },
  ];

  const [selectedScheme, setSelectedScheme] = useState("all");
  const [submissions] = useState([]); // empty for now (frontend only)

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-semibold mb-6">
        Scheme Submissions (Admin)
      </h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={selectedScheme}
          onChange={(e) => setSelectedScheme(e.target.value)}
          className="border rounded px-4 py-2 w-56"
        >
          {schemes.map((scheme) => (
            <option key={scheme.id} value={scheme.id}>
              {scheme.name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Apply
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Export Excel
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">
                Scheme
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                User
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                Answers
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                Status
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-10 text-gray-500"
                >
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.scheme}</td>
                  <td className="px-4 py-3">{item.user}</td>
                  <td className="px-4 py-3">{item.answers}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
