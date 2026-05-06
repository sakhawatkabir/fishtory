"use client";
import { useState, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Copy,
  CheckCheck,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  allDiscounts,
  discountStatusStyles,
  discountTypes,
  discountStatuses,
} from "@/lib/data/discounts";

const DiscountsTable = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = useMemo(() => {
    return allDiscounts.filter((d) => {
      const matchSearch =
        d.code.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase());
      const matchType = activeType === "All" || d.type === activeType;
      const matchStatus = activeStatus === "All" || d.status === activeStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [search, activeType, activeStatus]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = filtered.slice(startIndex, startIndex + pageSize);

  const reset = () => setCurrentPage(1);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const formatValue = (d) => {
    if (d.type === "Percentage") return `${d.value}%`;
    if (d.type === "Fixed") return `£${d.value}`;
    return "Free";
  };

  const usagePercent = (d) => Math.round((d.used / d.maxUses) * 100);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Filters */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search code or description…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  reset();
                }}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {discountTypes.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveType(t);
                  reset();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${activeType === t ? "bg-[#2f3a32] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {t}
              </button>
            ))}
            <div className="w-px bg-gray-200 mx-1" />
            {discountStatuses.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setActiveStatus(s);
                  reset();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${activeStatus === s ? "bg-[#2f3a32] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Type
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Min Order
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Expires
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-10 text-center text-sm text-gray-400"
                  >
                    No discounts found.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    {/* Code */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-gray-900 text-xs bg-gray-100 px-2 py-1 rounded">
                          {d.code}
                        </span>
                        <button
                          onClick={() => handleCopy(d.code, d.id)}
                          className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          title="Copy code"
                        >
                          {copiedId === d.id ? (
                            <CheckCheck
                              size={13}
                              className="text-emerald-500"
                            />
                          ) : (
                            <Copy size={13} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                        {d.description}
                      </p>
                    </td>
                    {/* Type */}
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">
                      {d.type}
                    </td>
                    {/* Value */}
                    <td className="px-5 py-3.5 font-semibold text-gray-900">
                      {formatValue(d)}
                    </td>
                    {/* Min order */}
                    <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">
                      {d.minOrder > 0 ? `£${d.minOrder}` : "—"}
                    </td>
                    {/* Usage bar */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${usagePercent(d) >= 100 ? "bg-red-400" : usagePercent(d) >= 75 ? "bg-amber-400" : "bg-emerald-400"}`}
                            style={{
                              width: `${Math.min(usagePercent(d), 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {d.used}/{d.maxUses}
                        </span>
                      </div>
                    </td>
                    {/* Expires */}
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden md:table-cell whitespace-nowrap">
                      {d.expires}
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${discountStatusStyles[d.status]}`}
                      >
                        {d.status}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/discounts/${d.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(d.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                reset();
              }}
              className="px-2 py-1 text-xs border border-gray-200 rounded bg-white cursor-pointer focus:outline-none focus:border-gray-400"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-xs text-gray-500">per page</span>
          </div>
          <div className="text-xs text-gray-500">
            Showing {filtered.length === 0 ? 0 : startIndex + 1}–
            {Math.min(startIndex + pageSize, filtered.length)} of{" "}
            {filtered.length} discounts
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`e-${idx}`} className="px-2 text-gray-400 text-xs">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${currentPage === page ? "bg-[#2f3a32] text-white border-[#2f3a32]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Delete Discount
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-mono font-semibold text-gray-900">
                {allDiscounts.find((d) => d.id === deleteId)?.code}
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountsTable;
