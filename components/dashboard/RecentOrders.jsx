import Link from "next/link";
import { ArrowRight } from "lucide-react";

const orders = [
  {
    id: "#ORD-1042",
    customer: "James Whitfield",
    items: "Fresh Oysters x12, Salmon Fillets",
    total: "£31.98",
    status: "Delivered",
    date: "4 May 2026",
  },
  {
    id: "#ORD-1041",
    customer: "Sophie Turner",
    items: "King Prawns 500g",
    total: "£11.49",
    status: "Processing",
    date: "4 May 2026",
  },
  {
    id: "#ORD-1040",
    customer: "Marcus Reid",
    items: "Scallops x6, Mussels 1kg",
    total: "£27.98",
    status: "Shipped",
    date: "3 May 2026",
  },
  {
    id: "#ORD-1039",
    customer: "Priya Sharma",
    items: "Wild Salmon Fillets x2",
    total: "£14.99",
    status: "Delivered",
    date: "3 May 2026",
  },
  {
    id: "#ORD-1038",
    customer: "Tom Hargreaves",
    items: "Lobster Tails, Crab Legs",
    total: "£45.98",
    status: "Cancelled",
    date: "2 May 2026",
  },
];

const statusStyles = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  Cancelled: "bg-red-50 text-red-600",
};

const RecentOrders = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Recent Orders</h2>
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-1 text-xs font-medium text-[#2f3a32] hover:underline cursor-pointer"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>
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
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Items
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
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
                <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell max-w-[180px] truncate">
                  {order.items}
                </td>
                <td className="px-5 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                  {order.total}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
