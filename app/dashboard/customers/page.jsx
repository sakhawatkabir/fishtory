import CustomersTable from "@/components/dashboard/CustomersTable";
import React from "react";

export const metadata = {
  title: "Customers | Fish Tory Admin",
};

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your customer base.
          </p>
        </div>
        <button className="bg-[#2f3a32] text-white px-4 py-2 text-sm font-semibold hover:bg-[#1e2820] transition-colors cursor-pointer">
          Export
        </button>
      </div>
      <CustomersTable />
    </div>
  );
};

export default CustomersPage;
