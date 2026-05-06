import DiscountsTable from "@/components/dashboard/DiscountsTable";
import { allDiscounts } from "@/lib/data/discounts";
import { Tag, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Discounts | Fish Tory Admin",
};

const DiscountsPage = () => {
  const total = allDiscounts.length;
  const active = allDiscounts.filter((d) => d.status === "Active").length;
  const expired = allDiscounts.filter(
    (d) => d.status === "Expired" || d.status === "Exhausted",
  ).length;
  const totalUsed = allDiscounts.reduce((s, d) => s + d.used, 0);

  const stats = [
    {
      label: "Total Codes",
      value: total,
      icon: Tag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active",
      value: active,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Expired / Used Up",
      value: expired,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-50",
    },
    {
      label: "Total Redemptions",
      value: totalUsed,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage discount codes for your store.
          </p>
        </div>
        <Link
          href="/dashboard/discounts/new"
          className="flex items-center gap-2 bg-[#2f3a32] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-[#1e2820] transition-colors cursor-pointer"
        >
          <Tag size={15} />
          Create Discount
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}
            >
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <DiscountsTable />
    </div>
  );
};

export default DiscountsPage;
