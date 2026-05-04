import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export const metadata = {
  title: "Admin Dashboard | Fish Tory",
  description: "Fish Tory admin panel",
};

export default function DashboardLayout({ children }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
