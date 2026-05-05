import { CheckCircle2, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ProductStatusDropDown = ({
  ALL_STATUSES,
  currentCfg,
  setPendingStatus,
}) => {
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

  const handleSelectStatus = (s) => {
    setDropdownOpen(false);
    if (s.value === status) return;
    setPendingStatus(s);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded border text-sm font-medium transition-colors cursor-pointer ${currentCfg.badge} border ${currentCfg.ring} ring-1`}
      >
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full shrink-0 ${currentCfg.dot}`} />
          <currentCfg.icon size={14} />
          {currentCfg.label}
        </span>
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

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
    </div>
  );
};

export default ProductStatusDropDown;
