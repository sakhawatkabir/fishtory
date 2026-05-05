"use client";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ msg, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#2f3a32] text-white text-sm font-medium rounded-lg shadow-lg">
      <CheckCircle2 size={15} />
      {msg}
    </div>
  );
}
