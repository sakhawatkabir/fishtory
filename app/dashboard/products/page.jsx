import ProductsTable from "@/components/dashboard/ProductsTable";
import { allProducts } from "@/lib/data/products";
import { Package, TrendingDown, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Products | Fish Tory Admin",
};

const ProductsPage = () => {
  const total = allProducts.length;
  const active = allProducts.filter((p) => p.status === "Active").length;
  const lowStock = allProducts.filter((p) => p.status === "Low Stock").length;
  const outOfStock = allProducts.filter(
    (p) => p.status === "Out of Stock",
  ).length;

  const stats = [
    {
      label: "Total Products",
      value: total,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active",
      value: active,
      icon: Package,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: TrendingDown,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product catalogue and inventory.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#2f3a32] text-white px-4 py-2 text-sm font-semibold rounded hover:bg-[#1e2820] transition-colors cursor-pointer">
          <Package size={15} />
          Add Product
        </button>
      </div>

      {/* Quick stats */}
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
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
