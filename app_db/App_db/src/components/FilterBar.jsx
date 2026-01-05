export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="bg-white rounded shadow px-4 py-3 flex flex-wrap items-center justify-between gap-4">

      {/* Search */}
<div className="relative w-[30%] sm:w-1/3">
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
    
  </span>

  <input
    type="text"
    placeholder="Search"
    className="border border-gray-300 rounded-lg pl-4 pr-10 py-2 w-full 
               focus:outline-none focus:ring-2 focus:ring-orange-300"
    value={filters.search}
    onChange={(e) =>
      setFilters({ ...filters, search: e.target.value })
    }
  />
</div>


      {/* Filter Selectors */}
      <div className="flex gap-2">
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="All">All</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={filters.skill}
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
        >
          <option value="All">All</option>
          <option value="Listening">Listening</option>
          <option value="Speaking">Speaking</option>
          <option value="Reading">Reading</option>
          <option value="Writing">Writing</option>
          <option value="Grammar">Grammar</option>
        </select>
      </div>

      {/* New Exam Button */}
      <button className="bg-white text-black   px-4 py-2 rounded-lg hover:bg-green-700 transition">
        + New Exam
      </button>
    </div>
  );
}
