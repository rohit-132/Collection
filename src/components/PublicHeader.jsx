export default function PublicHeader() {
  return (
    <header className="bg-[#f8fafc] border-b border-slate-300 h-[110px] flex items-center px-4 sm:px-12">
      <img
        src="/maha-logo.png"
        className="h-[70px] sm:h-[100px] w-auto object-contain"
        alt="Maha Logo"
      />

      <div className="flex-1 text-center">
        <h1 className="font-bold text-lg sm:text-3xl uppercase tracking-wide">
          Government of Maharashtra
        </h1>
        <p className="text-xs sm:text-base text-gray-600">
          Other Backward Bahujan Welfare Department
        </p>
      </div>

      {/* RIGHT SIDE LOGO */}
      <img
        src="/maha2-logo.png"
        className="h-[100px] sm:h-[110px] w-auto object-contain ml-auto"
        alt="Maha Secondary Logo"
      />
    </header>
  );
}
