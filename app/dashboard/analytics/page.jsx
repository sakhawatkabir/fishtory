import { allOrders } from "@/lib/data/orders";
import { allProducts } from "@/lib/data/products";
import KpiCards from "@/components/dashboard/analytics/KpiCards";
import DailyRevenueChart from "@/components/dashboard/analytics/DailyRevenueChart";
import MonthlyRevenueChart from "@/components/dashboard/analytics/MonthlyRevenueChart";
import OrderStatusChart from "@/components/dashboard/analytics/OrderStatusChart";
import CategoryRevenueChart from "@/components/dashboard/analytics/CategoryRevenueChart";
import TopProductsChart from "@/components/dashboard/analytics/TopProductsChart";
import StockLevelsChart from "@/components/dashboard/analytics/StockLevelsChart";

export const metadata = {
  title: "Analytics | Fish Tory Admin",
};

// ── KPI calculations ──────────────────────────────────────────
const totalRevenue = allOrders
  .filter((o) => o.status !== "Cancelled")
  .reduce((sum, o) => sum + parseFloat(o.total.replace("£", "")), 0);
const totalOrders = allOrders.length;
const delivered = allOrders.filter((o) => o.status === "Delivered").length;
const cancelled = allOrders.filter((o) => o.status === "Cancelled").length;
const conversionRate = (
  ((totalOrders - cancelled) / totalOrders) *
  100
).toFixed(1);
const avgOrderValue = (totalRevenue / (totalOrders - cancelled)).toFixed(2);

// ── Chart data ────────────────────────────────────────────────
const revenueByDay = [
  { day: "22 Apr", revenue: 81.45 },
  { day: "23 Apr", revenue: 26.98 },
  { day: "24 Apr", revenue: 64.46 },
  { day: "25 Apr", revenue: 100.94 },
  { day: "26 Apr", revenue: 40.47 },
  { day: "27 Apr", revenue: 57.96 },
  { day: "28 Apr", revenue: 123.93 },
  { day: "29 Apr", revenue: 66.96 },
  { day: "30 Apr", revenue: 46.47 },
  { day: "1 May", revenue: 81.44 },
  { day: "2 May", revenue: 84.45 },
  { day: "3 May", revenue: 42.97 },
  { day: "4 May", revenue: 43.47 },
];

const monthlyRevenue = [
  { month: "Dec", revenue: 1820 },
  { month: "Jan", revenue: 2140 },
  { month: "Feb", revenue: 1960 },
  { month: "Mar", revenue: 2380 },
  { month: "Apr", revenue: 2750 },
  { month: "May", revenue: 812 },
];

const ordersByStatus = [
  {
    name: "Delivered",
    value: allOrders.filter((o) => o.status === "Delivered").length,
    fill: "#10b981",
  },
  {
    name: "Shipped",
    value: allOrders.filter((o) => o.status === "Shipped").length,
    fill: "#3b82f6",
  },
  {
    name: "Processing",
    value: allOrders.filter((o) => o.status === "Processing").length,
    fill: "#f59e0b",
  },
  {
    name: "Cancelled",
    value: allOrders.filter((o) => o.status === "Cancelled").length,
    fill: "#ef4444",
  },
];

const revenueByCategory = [
  { category: "Fish", revenue: 1842.3 },
  { category: "Shellfish", revenue: 2614.55 },
  { category: "Smoked", revenue: 1089.4 },
];

const topProducts = [
  { name: "King Prawns 500g", sold: 211 },
  { name: "Smoked Salmon 200g", sold: 201 },
  { name: "Fresh Live Mussels 1kg", sold: 189 },
  { name: "Smoked Mackerel", sold: 176 },
  { name: "Fresh Jersey Oysters", sold: 142 },
];

const stockByCategory = allProducts.reduce((acc, p) => {
  const existing = acc.find((a) => a.category === p.category);
  if (existing) existing.stock += p.stock;
  else acc.push({ category: p.category, stock: p.stock });
  return acc;
}, []);

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sales performance, order trends, and inventory overview.
        </p>
      </div>

      {/* KPI cards */}
      <KpiCards
        totalRevenue={totalRevenue}
        totalOrders={totalOrders}
        delivered={delivered}
        cancelled={cancelled}
        avgOrderValue={avgOrderValue}
        conversionRate={conversionRate}
      />

      {/* Row 1: Daily + Monthly revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailyRevenueChart data={revenueByDay} />
        </div>
        <MonthlyRevenueChart data={monthlyRevenue} />
      </div>

      {/* Row 2: Order status + Category revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderStatusChart data={ordersByStatus} />
        <CategoryRevenueChart data={revenueByCategory} />
      </div>

      {/* Row 3: Top products + Stock levels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsChart data={topProducts} />
        <StockLevelsChart data={stockByCategory} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
