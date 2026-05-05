import OrdersTable from "@/components/dashboard/OrdersTable";

export const metadata = {
  title: "Orders | Fish Tory Admin",
};

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage all customer orders.
          </p>
        </div>
        <button className="bg-[#2f3a32] text-white px-4 py-2 text-sm font-semibold hover:bg-[#1e2820] transition-colors cursor-pointer rounded">
          Export
        </button>
      </div>
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
