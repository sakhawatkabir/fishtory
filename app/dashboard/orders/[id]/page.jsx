import { allOrders, statusStyles } from "@/lib/data/orders";
import OrderActions from "@/components/dashboard/OrderActions";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  Receipt,
  User,
} from "lucide-react";

export async function generateStaticParams() {
  return allOrders.map((o) => ({ id: o.id.replace("#", "") }));
}

export async function generateMetadata({ params }) {
  const order = allOrders.find((o) => o.id.replace("#", "") === params.id);
  if (!order) return { title: "Order Not Found" };
  return { title: `${order.id} | Fish Tory Admin` };
}

const orderLineItems = {
  "ORD-1042": [
    { name: "Atlantic Salmon Fillet", qty: 1, unit: "£15.99", subtotal: "£15.99" },
    { name: "Smoked Mackerel Pack",   qty: 1, unit: "£15.99", subtotal: "£15.99" },
  ],
  "ORD-1041": [
    { name: "Sea Bass (Whole)",       qty: 1, unit: "£11.49", subtotal: "£11.49" },
  ],
  "ORD-1040": [
    { name: "Cod Loin Portions",      qty: 1, unit: "£13.99", subtotal: "£13.99" },
    { name: "King Prawns 400g",       qty: 1, unit: "£13.99", subtotal: "£13.99" },
  ],
  "ORD-1039": [
    { name: "Rainbow Trout Fillet",   qty: 1, unit: "£14.99", subtotal: "£14.99" },
  ],
  "ORD-1038": [
    { name: "Lobster Tail (2 pack)",  qty: 1, unit: "£24.99", subtotal: "£24.99" },
    { name: "Garlic Butter Sauce",    qty: 1, unit: "£20.99", subtotal: "£20.99" },
  ],
};

const statusTimeline = {
  Delivered:  ["Order Placed", "Processing", "Shipped", "Delivered"],
  Shipped:    ["Order Placed", "Processing", "Shipped"],
  Processing: ["Order Placed", "Processing"],
  Cancelled:  ["Order Placed", "Cancelled"],
};

const statusIcons = {
  Delivered:  CheckCircle2,
  Processing: Clock,
  Shipped:    Truck,
  Cancelled:  XCircle,
};

export default function OrderDetailPage({ params }) {
  const order = allOrders.find((o) => o.id.replace("#", "") === params.id);
  if (!order) notFound();

  const lineItems =
    orderLineItems[params.id] ??
    Array.from({ length: order.items }, (_, i) => ({
      name: `Fish Product ${i + 1}`,
      qty: 1,
      unit: "—",
      subtotal: "—",
    }));

  const timeline   = statusTimeline[order.status] ?? [];
  const StatusIcon = statusIcons[order.status] ?? Clock;

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
          <p className="text-sm text-gray-500 mt-0.5">Placed on {order.date}</p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium w-fit ${statusStyles[order.status]}`}
        >
          <StatusIcon size={14} />
          {order.status}
        </span>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg px-6 py-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">
          Order Progress
        </h2>
        <div className="flex items-center">
          {timeline.map((step, idx) => {
            const isLast      = idx === timeline.length - 1;
            const isCancelled = step === "Cancelled";
            return (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      isCancelled
                        ? "bg-red-50 border-red-300 text-red-500"
                        : "bg-[#2f3a32] border-[#2f3a32] text-white"
                    }`}
                  >
                    {isCancelled ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                  </div>
                  <span
                    className={`text-xs font-medium whitespace-nowrap ${
                      isCancelled ? "text-red-500" : "text-gray-700"
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 ${
                      isCancelled ? "bg-red-200" : "bg-[#2f3a32]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: line items — spans 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Package size={16} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Order Items</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
                    Qty
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center shrink-0">
                          <Package size={16} className="text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-center">{item.qty}</td>
                    <td className="px-6 py-4 text-gray-600 text-right">{item.unit}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                      {item.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="px-6 py-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{order.total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span className="text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* ── Interactive actions panel ── */}
          <OrderActions
            initialStatus={order.status}
            orderId={order.id}
            total={order.total}
          />

          {/* Customer */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2">
              <User size={15} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Customer</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Name</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{order.customer}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-gray-400 shrink-0" />
                <p className="text-sm text-gray-600 truncate">{order.email}</p>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Shipping Address</h2>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">{order.address}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard size={15} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Payment</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="text-gray-800 font-medium">Visa •••• 4242</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="text-emerald-600 font-medium">Paid</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="text-gray-900 font-bold">{order.total}</span>
              </div>
            </div>
          </div>

          {/* Static notes placeholder (replaced by OrderActions notes log when notes exist) */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Receipt size={15} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Order Notes</h2>
            </div>
            <p className="text-sm text-gray-400 italic">No notes yet. Use &quot;Add Note&quot; above.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
