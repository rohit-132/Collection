export default function Card({ title, value }) {
  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition">

      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>

    </div>
  );
}
