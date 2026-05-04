import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  { name: "Fresh Jersey Oysters x12", sold: 312, revenue: "£4,053", stock: 48 },
  { name: "Wild Salmon Fillets", sold: 245, revenue: "£3,668", stock: 22 },
  { name: "King Prawns 500g", sold: 198, revenue: "£2,275", stock: 61 },
  { name: "Fresh Scallops x6", sold: 156, revenue: "£2,962", stock: 14 },
  { name: "Live Mussels 1kg", sold: 134, revenue: "£1,205", stock: 80 },
];

const TopProducts = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Top Products</h2>
        <Link
          href="/dashboard/products"
          className="flex items-center gap-1 text-xs font-medium text-[#2f3a32] hover:underline cursor-pointer"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>
      <ul className="divide-y divide-gray-100">
        {products.map((product, i) => (
          <li
            key={product.name}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          >
            <span className="w-5 text-xs font-bold text-gray-400 shrink-0">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {product.sold} sold · {product.stock} in stock
              </p>
            </div>
            <span className="text-sm font-semibold text-gray-900 shrink-0">
              {product.revenue}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
