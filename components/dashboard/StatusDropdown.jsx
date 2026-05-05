import { CheckCircle2, Clock, ChevronDown, Truck, XCircle } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import Modal from "./ui/Modal";

const ALL_STATUSES = [
  {
    value: "Processing",
    label: "Processing",
    icon: Clock,
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    ring: "ring-amber-300",
  },
  {
    value: "Shipped",
    label: "Shipped",
    icon: Truck,
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    ring: "ring-blue-300",
  },
  {
    value: "Delivered",
    label: "Delivered",
    icon: CheckCircle2,
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ring: "ring-emerald-300",
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    icon: XCircle,
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600 border-red-200",
    ring: "ring-red-300",
  },
];

const StatusDropdown = ({ initialStatus, orderId, showToast }) => {
  const [status, setStatus] = useState(initialStatus);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentStatusCfg = ALL_STATUSES.find((s) => s.value === status);

  const handleSelectStatus = (s) => {
    setDropdownOpen(false);
    if (s.value === status) return;
    setPendingStatus(s);
  };

  const confirmStatusChange = () => {
    const type = pendingStatus.value === "Cancelled" ? "warning" : "success";
    setStatus(pendingStatus.value);
    showToast(`Status updated to ${pendingStatus.label}.`, type);
    setPendingStatus(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setDropdownOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded border text-sm font-medium transition-colors cursor-pointer ${currentStatusCfg.badge} border ${currentStatusCfg.ring} ring-1`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${currentStatusCfg.dot}`}
          />
          <currentStatusCfg.icon size={14} />
          {currentStatusCfg.label}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
          {ALL_STATUSES.map((s) => {
            const isActive = s.value === status;
            return (
              <button
                key={s.value}
                onClick={() => handleSelectStatus(s)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  isActive
                    ? "bg-gray-50 text-gray-400 cursor-default"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                <s.icon size={14} className="shrink-0" />
                <span className="flex-1 text-left">{s.label}</span>
                {isActive && (
                  <CheckCircle2 size={14} className="text-gray-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {pendingStatus && (
        <Modal onClose={() => setPendingStatus(null)}>
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
                {currentStatusCfg.label} → {pendingStatus.label}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Update order{" "}
            <span className="font-semibold text-gray-900">{orderId}</span> to{" "}
            <span
              className={`font-semibold px-1.5 py-0.5 rounded text-xs ${pendingStatus.badge}`}
            >
              {pendingStatus.label}
            </span>
            ?
            {pendingStatus.value === "Cancelled" && (
              <span className="block mt-2 text-amber-600 text-xs">
                ⚠ Cancelling will notify the customer.
              </span>
            )}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setPendingStatus(null)}
              className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Keep Current
            </button>
            <button
              onClick={confirmStatusChange}
              className={`flex-1 px-4 py-2 text-sm font-semibold rounded text-white transition-colors cursor-pointer ${
                pendingStatus.value === "Cancelled"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#2f3a32] hover:bg-[#1e2820]"
              }`}
            >
              Confirm
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StatusDropdown;
