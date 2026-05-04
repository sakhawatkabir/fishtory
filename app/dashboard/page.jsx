import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TopProducts from "@/components/dashboard/TopProducts";
import QuickActions from "@/components/dashboard/QuickActions";

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back — here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Quick actions */}
      <QuickActions />

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
