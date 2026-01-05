export default function Navbar() {
  return (
    <nav className=" bg-orange-100 px-6 py-4 shadow-sm flex justify-between items-center">
      {/* Sol kısım: Logo + Menü */}
      <div className="flex items-center gap-4">
        <div className="flex gap-4 items-center text-xl font-bold text-orange-600">
          <img
            src="/icon/hat.png"
            alt="Hat"
            className="w-4 h-4 object-contain"
          />
          <h1 className="gap-4 text-xl font-bold text-orange-600">Eindhoven Taal School</h1>

        </div>

      </div>

      {/* Sağ kısım: İkonlar */}
      <div className="flex gap-4 items-center text-xl">

        <span title="Language">🌐</span>
        <span title="User">👤</span>
      </div>
    </nav>
  );
}
