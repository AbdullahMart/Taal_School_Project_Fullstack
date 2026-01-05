import { useEffect, useState } from "react";

export default function QuestionTable({ filters }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    fetch("http://localhost:3001/api/questions")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  const filtered = data.filter((item) => {
    const matchSearch =
      filters.search === "" ||
      item.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchLevel = filters.level === "All" || item.level === filters.level;
    const matchSkill =
      filters.skill === "All" || item.skill === filters.skill;
    return matchSearch && matchLevel && matchSkill;
  });

  const pageCount = Math.ceil(filtered.length / perPage);
  const visibleData = filtered.slice((page - 1) * perPage, page * perPage);

  const statusBadge = (status) => {
    const base = "inline-block px-3 py-1 rounded-full text-xs font-medium";
    const s = status.toLowerCase();
    if (s === "approved") return `${base} bg-green-100 text-green-700`;
    if (s === "processing") return `${base} bg-blue-100 text-blue-700`;
    if (s === "active") return `${base} bg-teal-100 text-teal-700`;
    return `${base} bg-gray-100 text-gray-600`;
  };

  return (
    <div className=" bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="px-6 py-3">Created At</th>
            <th className="px-6 py-3">Level</th>
            <th className="px-6 py-3">Skills</th>
            <th className="px-6 py-3">Code</th>
            <th className="px-6 py-3">Exam Name</th>
            <th className="px-6 py-3 text-center">Paragraphs</th>
            <th className="px-6 py-3 text-center">Question</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {visibleData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
              <td className="px-6 py-4 text-blue-600 font-semibold">{item.level}</td>
              <td className="px-6 py-4 capitalize">{item.skill}</td>
              <td className="px-6 py-4">{item.code}</td>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4 text-center">{item.meta?.paragraphs ?? 0}</td>
              <td className="px-6 py-4 text-center">{item.meta?.questions ?? 0}</td>
              <td className="px-6 py-4">
                <span className={statusBadge(item.status)}>{item.status}</span>
              </td>
              <td className="px-6 py-4 text-center flex justify-center gap-2 text-gray-500">
                <button
                  title="View"
                  className="inline-flex items-center justify-center w-6 h-6 hover:bg-gray-100 transition"
                >
                  <img
                    src="/icon/eye.png"
                    alt="View"
                    className="w-4 h-4 object-contain"
                  />
                </button>

                <td className="text-center align-middle">
                  <button
                    title="Edit"
                    className="inline-flex items-center justify-center w-6 h-6 hover:bg-gray-100 transition"
                  >
                    <img
                      src="/icon/edit.png"
                      alt="Edit"
                      className="w-4 h-4 object-contain"
                    />
                  </button>
                </td >

                <button
                  title="delete"
                  className="inline-flex items-center justify-center w-6 h-6 hover:bg-gray-100 transition"
                >
                  <img
                    src="/icon/delete.png"
                    alt="Delete"
                    className="w-4 h-4 object-contain"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-end items-center gap-2 px-4 py-3 bg-white border-t">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 rounded-md text-sm border transition ${page === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
