import { allProducts, productStatusStyles } from "@/lib/data/products";
import ProductActions from "@/components/dashboard/ProductActions";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Tag,
  Hash,
  BarChart2,
  ShoppingBag,
  TrendingUp,
  Star,
  Pencil,
} from "lucide-react";

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} | Fish Tory Admin` };
}

const productStats = {
  1: { sold: 142, revenue: "£1,844.58", views: 1230, rating: 4.8 },
  2: { sold: 98, revenue: "£1,469.02", views: 870, rating: 4.7 },
  3: { sold: 211, revenue: "£2,424.39", views: 1540, rating: 4.6 },
  4: { sold: 67, revenue: "£1,272.33", views: 620, rating: 4.9 },
  5: { sold: 189, revenue: "£1,699.11", views: 1100, rating: 4.5 },
  6: { sold: 54, revenue: "£891.00", views: 490, rating: 4.4 },
  7: { sold: 176, revenue: "£1,318.24", views: 980, rating: 4.6 },
  8: { sold: 123, revenue: "£1,720.77", views: 1050, rating: 4.7 },
  9: { sold: 45, revenue: "£719.55", views: 410, rating: 4.8 },
  10: { sold: 88, revenue: "£1,495.12", views: 760, rating: 4.5 },
  11: { sold: 201, revenue: "£2,007.99", views: 1380, rating: 4.9 },
  12: { sold: 72, revenue: "£971.28", views: 640, rating: 4.3 },
  13: { sold: 39, revenue: "£974.61", views: 520, rating: 4.8 },
  14: { sold: 115, revenue: "£1,666.35", views: 890, rating: 4.6 },
  15: { sold: 94, revenue: "£1,033.06", views: 720, rating: 4.7 },
};

export default function ProductDetailPage({ params }) {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();
  const stats = productStats[product.id] ?? {
    sold: 0,
    revenue: "—",
    views: 0,
    rating: "—",
  };

  const statsData = [
    {
      label: "Units Sold",
      value: stats.sold,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Revenue",
      value: stats.revenue,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Page Views",
      value: stats.views,
      icon: BarChart2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Avg. Rating",
      value: stats.rating,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Products
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-gray-500 font-mono">
              {product.sku}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${productStatusStyles[product.status]}`}
            >
              {product.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-bold text-gray-900">{product.price}</p>
          <Link
            href={`/dashboard/products/${product.slug}/edit`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Pencil size={14} />
            Edit
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map(({ label, value, icon: Icon, color, bg }) => (
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
              <p className="text-lg font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: image + details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product image */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative w-full h-64 sm:h-80 bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Product Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Tag size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Hash size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">SKU</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5 font-mono">
                    {product.sku}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <Package size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Stock</p>
                  <p
                    className={`text-sm font-medium mt-0.5 ${
                      product.stock === 0
                        ? "text-red-500"
                        : product.stock < 20
                          ? "text-amber-600"
                          : "text-gray-800"
                    }`}
                  >
                    {product.stock} units
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  <TrendingUp size={14} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Description</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div>
          <ProductActions
            initialStatus={product.status}
            initialStock={product.stock}
            productId={product.id}
            productName={product.name}
          />
        </div>
      </div>
    </div>
  );
}
