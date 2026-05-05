import { TrendingUp, ShoppingBag, Users, PackageCheck } from "lucide-react";

const KpiCards = ({
  totalRevenue,
  totalOrders,
  delivered,
  cancelled,
  avgOrderValue,
  conversionRate,
}) => {
  const kpis = [
    {
      label: "Total Revenue",
      value: `£${totalRevenue.toFixed(2)}`,
      sub: "excl. cancelled orders",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+12.4%",
      up: true,
    },
    {
      label: "Total Orders",
      value: totalOrders,
      sub: `${delivered} delivered`,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+8.1%",
      up: true,
    },
    {
      label: "Avg. Order Value",
      value: `£${avgOrderValue}`,
      sub: "per completed order",
      icon: PackageCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "+3.2%",
      up: true,
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      sub: `${cancelled} cancelled`,
      icon: Users,
      color: "text-amber-600",
      bg: "bg-amber-50",
      trend: "-1.1%",
      up: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map(({ label, value, sub, icon: Icon, color, bg, trend, up }) => (
        <div
          key={label}
          className="bg-white border border-gray-200 rounded-lg p-5"
        >
          <div className="flex items-start justify-between gap-2">
            <div
              className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}
            >
              <Icon size={20} className={color} />
            </div>
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}
            >
              {trend}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-3">{value}</p>
          <p className="text-xs font-medium text-gray-500 mt-0.5">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
