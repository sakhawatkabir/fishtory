import Link from "next/link";
import { Plus, Tag, Truck, Bell } from "lucide-react";

const actions = [
  {
    label: "Add Product",
    description: "List a new item",
    href: "/dashboard/products",
    icon: Plus,
    color: "bg-[#2f3a32] text-white hover:bg-[#1e2820]",
  },
  {
    label: "Create Discount",
    description: "Set up a promo code",
    href: "/dashboard/discounts",
    icon: Tag,
    color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
  },
  {
    label: "Manage Delivery",
    description: "Update delivery zones",
    href: "/dashboard/delivery",
    icon: Truck,
    color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
  },
  {
    label: "Send Newsletter",
    description: "Email your subscribers",
    href: "/dashboard/newsletter",
    icon: Bell,
    color: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
  },
];

const QuickActions = () => {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${action.color}`}
            >
              <Icon size={16} className="shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold truncate">{action.label}</p>
                <p className="text-xs opacity-60 truncate">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
