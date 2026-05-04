"use client";
import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Fresh Jersey Oysters x12",
    category: "Shellfish",
    price: "£12.99",
    stock: 48,
    status: "Active",
    image: "/images/image2.webp",
  },
  {
    id: 2,
    name: "Wild Salmon Fillets (2pcs)",
    category: "Fish",
    price: "£14.99",
    stock: 22,
    status: "Active",
    image: "/images/img8.webp",
  },
  {
    id: 3,
    name: "King Prawns 500g",
    category: "Shellfish",
    price: "£11.49",
    stock: 61,
    status: "Active",
    image: "/images/img4.webp",
  },
  {
    id: 4,
    name: "Fresh Scallops x6 in Shells",
    category: "Shellfish",
    price: "£18.99",
    stock: 14,
    status: "Low Stock",
    image: "/images/img6.webp",
  },
  {
    id: 5,
    name: "Fresh Live Mussels 1kg",
    category: "Shellfish",
    price: "£8.99",
    stock: 80,
    status: "Active",
    image: "/images/img4.webp",
  },
  {
    id: 6,
    name: "Whole Trout",
    category: "Fish",
    price: "£16.50",
    stock: 0,
    status: "Out of Stock",
    image: "/images/trout1.webp",
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-red-50 text-red-600",
};

const ProductsTable = () => {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Search */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="relative max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Category
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 shrink-0 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900 line-clamp-1">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">
                    {product.category}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{product.stock}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[product.status]}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`Edit ${product.name}`}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors duration-150 cursor-pointer"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        aria-label={`Delete ${product.name}`}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-150 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {filtered.length} of {products.length} products
      </div>
    </div>
  );
};

export default ProductsTable;
