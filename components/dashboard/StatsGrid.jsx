import {
  ShoppingBag,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Revenue",
    value: "£24,563",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    sub: "vs last month",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    sub: "vs last month",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "New Customers",
    value: "342",
    change: "-3.1%",
    trend: "down",
    icon: Users,
    sub: "vs last month",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Avg. Order Value",
    value: "£19.13",
    change: "+4.6%",
    trend: "up",
    icon: TrendingUp,
    sub: "vs last month",
    color: "bg-amber-50 text-amber-600",
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isUp = stat.trend === "up";
        return (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">
                {stat.label}
              </span>
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <Icon size={18} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center gap-1.5 mt-1">
                {isUp ? (
                  <ArrowUpRight size={14} className="text-emerald-500" />
                ) : (
                  <ArrowDownRight size={14} className="text-red-500" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    isUp ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400">{stat.sub}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
