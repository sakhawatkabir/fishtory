"use client";
import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Tag,
  Pencil,
  Trash2,
  Plus,
  Minus,
  Save,
  PackageOpen,
  XCircle,
} from "lucide-react";
import DeleteModal from "./DeleteModal";
import StockModal from "./StockModal";
import ProductStatusModal from "./ProductStatusModal";
import ProductStatusDropDown from "./ProductStatusDropDown";

const ALL_STATUSES = [
  {
    value: "Active",
    label: "Active",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ring: "ring-emerald-300",
    icon: CheckCircle2,
  },
  {
    value: "Low Stock",
    label: "Low Stock",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    ring: "ring-amber-300",
    icon: AlertTriangle,
  },
  {
    value: "Out of Stock",
    label: "Out of Stock",
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600 border-red-200",
    ring: "ring-red-300",
    icon: XCircle,
  },
];

const ProductActions = ({ initialStatus, initialStock, productName }) => {
  const [status, setStatus] = useState(initialStatus);
  const [stock, setStock] = useState(initialStock);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEditStock, setShowEditStock] = useState(false);
  const [stockInput, setStockInput] = useState(String(initialStock));
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const currentCfg = ALL_STATUSES.find((s) => s.value === status);

  const handleStockAdjust = (delta) => {
    const next = Math.max(0, stock + delta);
    setStock(next);
    if (next === 0) setStatus("Out of Stock");
    else if (next < 20) setStatus("Low Stock");
    else setStatus("Active");
    showToast(`Stock updated to ${next}.`);
  };

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
            toast.type === "warning" ? "bg-amber-500" : "bg-[#2f3a32]"
          }`}
        >
          {toast.type === "warning" ? (
            <AlertTriangle size={15} />
          ) : (
            <CheckCircle2 size={15} />
          )}
          {toast.msg}
        </div>
      )}

      {/* Status selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-gray-400" />
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Status
          </h2>
        </div>
        <ProductStatusDropDown
          ALL_STATUSES={ALL_STATUSES}
          currentCfg={currentCfg}
          setPendingStatus={setPendingStatus}
        />
      </div>

      {/* Stock management */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-2">
          <PackageOpen size={14} className="text-gray-400" />
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Inventory
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Current Stock</p>
            <p
              className={`text-2xl font-bold mt-0.5 ${
                stock === 0
                  ? "text-red-500"
                  : stock < 20
                    ? "text-amber-600"
                    : "text-gray-900"
              }`}
            >
              {stock}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleStockAdjust(-1)}
              disabled={stock === 0}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={() => handleStockAdjust(1)}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setStockInput(String(stock));
            setShowEditStock(true);
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Pencil size={14} />
          Set Stock Level
        </button>
      </div>

      {/* Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Actions
        </h2>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] transition-colors cursor-pointer">
          <Save size={15} />
          Save Changes
        </button>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
          <Pencil size={15} />
          Edit Product
        </button>

        <button
          onClick={() => setShowDelete(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-red-200 rounded text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <Trash2 size={15} />
          Delete Product
        </button>
      </div>

      {/* Confirm status change */}
      {pendingStatus && (
        <ProductStatusModal
          pendingStatus={pendingStatus}
          setPendingStatus={setPendingStatus}
          currentCfg={currentCfg}
          productName={productName}
          setStatus={setStatus}
          showToast={showToast}
        />
      )}

      {/* Edit stock modal */}
      {showEditStock && (
        <StockModal
          stockInput={stockInput}
          setStatus={setStatus}
          setStock={setStock}
          showToast={showToast}
          setStockInput={setStockInput}
          setShowEditStock={setShowEditStock}
        />
      )}

      {/* Delete confirm modal */}
      {showDelete && (
        <DeleteModal
          productName={productName}
          showToast={showToast}
          setShowDelete={setShowDelete}
        />
      )}
    </div>
  );
};

export default ProductActions;
