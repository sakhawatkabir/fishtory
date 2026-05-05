import { PackageOpen } from "lucide-react";
import { X } from "lucide-react";
import { Save } from "lucide-react";
import React from "react";

const StockModal = ({ stockInput, setStatus,setStock,showToast, setStockInput, setShowEditStock }) => {
  const handleStockSave = () => {
    const val = parseInt(stockInput, 10);
    if (isNaN(val) || val < 0) return;
    setStock(val);
    if (val === 0) setStatus("Out of Stock");
    else if (val < 20) setStatus("Low Stock");
    else setStatus("Active");
    setShowEditStock(false);
    showToast(`Stock set to ${val}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setShowEditStock(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <PackageOpen size={20} className="text-gray-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Set Stock Level
            </h3>
            <p className="text-sm text-gray-500">
              Enter the new stock quantity.
            </p>
          </div>
        </div>
        <input
          type="number"
          min="0"
          value={stockInput}
          onChange={(e) => setStockInput(e.target.value)}
          className="w-full text-sm border border-gray-200 rounded p-3 focus:outline-none focus:border-gray-400 mb-4"
          placeholder="Enter quantity"
        />
        <div className="flex gap-3">
          <button
            onClick={() => setShowEditStock(false)}
            className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleStockSave}
            disabled={stockInput === "" || isNaN(parseInt(stockInput, 10))}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Save size={14} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
