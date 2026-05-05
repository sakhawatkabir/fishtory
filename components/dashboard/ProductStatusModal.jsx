import { X } from "lucide-react";
import React from "react";

const ProductStatusModal = ({
  setPendingStatus,
  pendingStatus,
  currentCfg,
  productName,
  setStatus,
  showToast,
}) => {
  const confirmStatusChange = () => {
    setStatus(pendingStatus.value);
    showToast(`Status updated to "${pendingStatus.label}".`);
    setPendingStatus(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setPendingStatus(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${pendingStatus.badge}`}
          >
            <pendingStatus.icon size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Change Status
            </h3>
            <p className="text-sm text-gray-500">
              {currentCfg.label} → {pendingStatus.label}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Update{" "}
          <span className="font-semibold text-gray-900">{productName}</span> to{" "}
          <span
            className={`font-semibold px-1.5 py-0.5 rounded text-xs ${pendingStatus.badge}`}
          >
            {pendingStatus.label}
          </span>
          ?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setPendingStatus(null)}
            className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={confirmStatusChange}
            className="flex-1 px-4 py-2 text-sm font-semibold bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductStatusModal;
