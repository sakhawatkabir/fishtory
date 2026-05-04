"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const customers = [
  { id: 1, name: "James Whitfield", email: "james@example.com", orders: 14, spent: "£312.45", joined: "Jan 2025", status: "Active" },
  { id: 2, name: "Sophie Turner", email: "sophie@example.com", orders: 8, spent: "£187.20", joined: "Mar 2025", status: "Active" },
  { id: 3, name: "Marcus Reid", email: "marcus@example.com", orders: 22, spent: "£498.76", joined: "Nov 2024", status: "Active" },
  { id: 4, name: "Priya Sharma", email: "priya@example.com", orders: 5, spent: "£94.95", joined: "Apr 2026", status: "Active" },
  { id: 5, name: "Tom Hargreaves", email: "tom@example.com", orders: 3, spent: "£67.47", joined: "Feb 2026", status: "Inactive" },
  { id: 6, name: "Lily Chen", email: "lily@example.com", orders: 19, spent: "£421.33", joined: "Sep 2024", status: "Active" },
  { id: 7, name: "David Okafor", email: "david@example.com", orders: 7, spent: "£156.93", joined: "Dec 2024", status: "Active" },
  { id: 8, name: "Emma Walsh", email: "emma@example.com", orders: 31, spent: "£712.80", joined: "Aug 2024", status: "Active" },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-gray-100 text-gray-500",
};

export default function CustomersTable() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Search */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2f3a32] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">{customer.email}</td>
                  <td className="px-5 py-3.5 text-gray-700">{customer.orders}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">{customer.spent}</td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{customer.joined}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {filtered.length} of {customers.length} customers
      </div>
    </div>
  );
}
