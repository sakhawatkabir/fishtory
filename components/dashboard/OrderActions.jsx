"use client";
import { useState, useRef, useEffect } from "react";
import {
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  MessageSquarePlus,
  Tag,
} from "lucide-react";
import NoteModal from "./NoteModal";
import RefundModal from "./RefundModal";
import StatusDropdown from "./StatusDropdown";

export default function OrderActions({ initialStatus, orderId, total }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [toast, setToast] = useState(null);
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

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefund = () => {
    setShowRefund(false);
    showToast(`Refund of ${total} initiated.`);
  };

  const handleAddNote = () => {
    if (!note.trim()) return;
    setNotes((prev) => [
      {
        text: note.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...prev,
    ]);
    setNote("");
    setShowNote(false);
    showToast("Note added.");
  };

  const isCancelled = status === "Cancelled";
  const isDelivered = status === "Delivered";
  const canRefund = isDelivered || isCancelled;

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

      {/* ── Status selector ── */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-gray-400" />
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Order Status
          </h2>
        </div>

        <StatusDropdown
          initialStatus={initialStatus}
          orderId={orderId}
          showToast={showToast}
        />
      </div>

      {/* ── Other actions ── */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Actions
        </h2>

        {/* Print invoice */}
        <button
          onClick={() => {
            window.print();
            showToast("Sending to printer…");
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Printer size={15} />
          Print Invoice
        </button>

        {/* Add note */}
        <button
          onClick={() => setShowNote(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <MessageSquarePlus size={15} />
          Add Note
        </button>

        {/* Refund */}
        {canRefund && (
          <button
            onClick={() => setShowRefund(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-amber-200 rounded text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
          >
            <RotateCcw size={15} />
            Issue Refund
          </button>
        )}
      </div>

      {/* Notes log */}
      {notes.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Notes
          </h2>
          <div className="space-y-2">
            {notes.map((n, i) => (
              <div key={i} className="bg-gray-50 rounded p-3">
                <p className="text-sm text-gray-700">{n.text}</p>
                <p className="text-xs text-gray-400 mt-1">Today at {n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refund  modal */}
      {showRefund && (
        <RefundModal
          total={total}
          orderId={orderId}
          setShowRefund={setShowRefund}
          handleRefund={handleRefund}
        />
      )}

      {/*  note modal */}
      {showNote && (
        <NoteModal
          note={note}
          setNote={setNote}
          setShowNote={setShowNote}
          handleAddNote={handleAddNote}
        />
      )}
    </div>
  );
}
