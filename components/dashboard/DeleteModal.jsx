import { Trash2 } from "lucide-react";
import { X } from "lucide-react";
import React from "react";

const DeleteModal = ({ productName, showToast, setShowDelete }) => {
  const handleDelete = () => {
    setShowDelete(false);
    showToast(`"${productName}" has been deleted.`, "warning");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setShowDelete(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <Trash2 size={20} className="text-red-500" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Delete Product
            </h3>
            <p className="text-sm text-gray-500">This cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{productName}</span>? It
          will be removed from your catalogue.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowDelete(false)}
            className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Keep Product
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
