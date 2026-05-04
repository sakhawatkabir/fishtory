"use client";
import { useState } from "react";
import { Search, Filter } from "lucide-react";

const allOrders = [
  {
    id: "#ORD-1042",
    customer: "James Whitfield",
    email: "james@example.com",
    items: 2,
    total: "£31.98",
    status: "Delivered",
    date: "4 May 2026",
  },
  {
    id: "#ORD-1041",
    customer: "Sophie Turner",
    email: "sophie@example.com",
    items: 1,
    total: "£11.49",
    status: "Processing",
    date: "4 May 2026",
  },
  {
    id: "#ORD-1040",
    customer: "Marcus Reid",
    email: "marcus@example.com",
    items: 2,
    total: "£27.98",
    status: "Shipped",
    date: "3 May 2026",
  },
  {
    id: "#ORD-1039",
    customer: "Priya Sharma",
    email: "priya@example.com",
    items: 1,
    total: "£14.99",
    status: "Delivered",
    date: "3 May 2026",
  },
  {
    id: "#ORD-1038",
    customer: "Tom Hargreaves",
    email: "tom@example.com",
    items: 2,
    total: "£45.98",
    status: "Cancelled",
    date: "2 May 2026",
  },
  {
    id: "#ORD-1037",
    customer: "Lily Chen",
    email: "lily@example.com",
    items: 3,
    total: "£38.47",
    status: "Delivered",
    date: "2 May 2026",
  },
  {
    id: "#ORD-1036",
    customer: "David Okafor",
    email: "david@example.com",
    items: 1,
    total: "£18.99",
    status: "Shipped",
    date: "1 May 2026",
  },
  {
    id: "#ORD-1035",
    customer: "Emma Walsh",
    email: "emma@example.com",
    items: 4,
    total: "£62.45",
    status: "Delivered",
    date: "1 May 2026",
  },
];

const statusStyles = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-600",
};

const statuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrdersTable = () => {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered = allOrders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = activeStatus === "All" || o.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Filters */}
      <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 cursor-pointer ${
                activeStatus === s
                  ? "bg-[#2f3a32] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
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
                Order
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Email
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap">
                    {order.customer}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden lg:table-cell">
                    {order.email}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{order.items}</td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                    {order.total}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell whitespace-nowrap">
                    {order.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {filtered.length} of {allOrders.length} orders
      </div>
    </div>
  );
};

export default OrdersTable;
