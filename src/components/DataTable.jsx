export default function DataTable({ columns, data, onDelete }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-6 py-3 font-bold text-gray-700 uppercase"
              >
                {col.label}
              </th>
            ))}

            {onDelete && (
              <th className="text-right px-6 py-3 font-bold text-gray-700 uppercase">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center px-6 py-6 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-3">
                    {row[col.key]}
                  </td>
                ))}

                {onDelete && (
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
