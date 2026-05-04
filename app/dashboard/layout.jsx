import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Admin Dashboard | Fish Tory",
  description: "Fish Tory admin panel",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
