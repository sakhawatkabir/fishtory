"use client";
import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "./Pagination";

const allCustomers = [
  { id: 1, name: "James Whitfield", email: "james@example.com", orders: 14, spent: "£312.45", joined: "Jan 2025", status: "Active" },
  { id: 2, name: "Sophie Turner", email: "sophie@example.com", orders: 8, spent: "£187.20", joined: "Mar 2025", status: "Active" },
  { id: 3, name: "Marcus Reid", email: "marcus@example.com", orders: 22, spent: "£498.76", joined: "Nov 2024", status: "Active" },
  { id: 4, name: "Priya Sharma", email: "priya@example.com", orders: 5, spent: "£94.95", joined: "Apr 2026", status: "Active" },
  { id: 5, name: "Tom Hargreaves", email: "tom@example.com", orders: 3, spent: "£67.47", joined: "Feb 2026", status: "Inactive" },
  { id: 6, name: "Lily Chen", email: "lily@example.com", orders: 19, spent: "£421.33", joined: "Sep 2024", status: "Active" },
  { id: 7, name: "David Okafor", email: "david@example.com", orders: 7, spent: "£156.93", joined: "Dec 2024", status: "Active" },
  { id: 8, name: "Emma Walsh", email: "emma@example.com", orders: 31, spent: "£712.80", joined: "Aug 2024", status: "Active" },
  { id: 9, name: "Oliver Brown", email: "oliver@example.com", orders: 12, spent: "£289.54", joined: "Oct 2024", status: "Active" },
  { id: 10, name: "Ava Martinez", email: "ava@example.com", orders: 6, spent: "£143.88", joined: "Feb 2025", status: "Active" },
  { id: 11, name: "Noah Wilson", email: "noah@example.com", orders: 18, spent: "£401.22", joined: "Jul 2024", status: "Active" },
  { id: 12, name: "Isabella Garcia", email: "isabella@example.com", orders: 9, spent: "£198.76", joined: "Jan 2025", status: "Inactive" },
  { id: 13, name: "Liam Anderson", email: "liam@example.com", orders: 25, spent: "£567.89", joined: "Jun 2024", status: "Active" },
  { id: 14, name: "Mia Thomas", email: "mia@example.com", orders: 11, spent: "£267.43", joined: "Nov 2024", status: "Active" },
  { id: 15, name: "Ethan Taylor", email: "ethan@example.com", orders: 4, spent: "£89.32", joined: "Mar 2025", status: "Active" },
  { id: 16, name: "Charlotte Moore", email: "charlotte@example.com", orders: 16, spent: "£378.91", joined: "Aug 2024", status: "Active" },
  { id: 17, name: "Lucas Jackson", email: "lucas@example.com", orders: 20, spent: "£456.78", joined: "Sep 2024", status: "Active" },
  { id: 18, name: "Amelia White", email: "amelia@example.com", orders: 7, spent: "£162.45", joined: "Dec 2024", status: "Inactive" },
  { id: 19, name: "Mason Harris", email: "mason@example.com", orders: 13, spent: "£301.23", joined: "Oct 2024", status: "Active" },
  { id: 20, name: "Harper Martin", email: "harper@example.com", orders: 10, spent: "£234.56", joined: "Jan 2025", status: "Active" },
  { id: 21, name: "Elijah Thompson", email: "elijah@example.com", orders: 24, spent: "£543.21", joined: "May 2024", status: "Active" },
  { id: 22, name: "Evelyn Lee", email: "evelyn@example.com", orders: 8, spent: "£176.54", joined: "Feb 2025", status: "Active" },
  { id: 23, name: "Benjamin Walker", email: "benjamin@example.com", orders: 15, spent: "£345.67", joined: "Jul 2024", status: "Active" },
  { id: 24, name: "Abigail Hall", email: "abigail@example.com", orders: 6, spent: "£132.10", joined: "Mar 2025", status: "Inactive" },
  { id: 25, name: "Logan Allen", email: "logan@example.com", orders: 19, spent: "£432.98", joined: "Aug 2024", status: "Active" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-gray-100 text-gray-500",
};

const CustomersTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    return allCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCustomers = filtered.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
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

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Search */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Email
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Joined
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            
            <Pagination statusStyles={statusStyles} customers={paginatedCustomers}/>
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 text-xs border border-gray-200 rounded bg-white cursor-pointer focus:outline-none focus:border-gray-400"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span className="text-xs text-gray-500">per page</span>
        </div>

        <div className="text-xs text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of{" "}
          {filtered.length} customers
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2.5 py-1 text-xs rounded border transition-colors duration-150 cursor-pointer ${
                  currentPage === page
                    ? "bg-[#2f3a32] text-white border-[#2f3a32]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
