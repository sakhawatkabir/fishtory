import { X, RotateCcw } from "lucide-react";
import React from "react";

const RefundModal = ({total, orderId, setShowRefund, handleRefund}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setShowRefund(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
            <RotateCcw size={20} className="text-amber-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Issue Refund
            </h3>
            <p className="text-sm text-gray-500">
              Full refund to original payment method.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Refund <span className="font-semibold text-gray-900">{total}</span> to
          the customer for order{" "}
          <span className="font-semibold text-gray-900">{orderId}</span>?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRefund(false)}
            className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleRefund}
            className="flex-1 px-4 py-2 text-sm font-semibold bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Confirm Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
