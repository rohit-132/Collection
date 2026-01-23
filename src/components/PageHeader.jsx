export default function PageHeader({ title, subtitle }) {
  return (
    <div className="border-b pb-4 mb-4">

      <h1 className="text-2xl font-bold text-gray-900">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm text-gray-600 mt-1">
          {subtitle}
        </p>
      )}

    </div>
  );
}
