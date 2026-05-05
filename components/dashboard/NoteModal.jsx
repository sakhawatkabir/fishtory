import { MessageSquarePlus } from "lucide-react";
import { X } from "lucide-react";
import { Send } from "lucide-react";
import React from "react";

const NoteModal = ({ note, setNote, setShowNote, handleAddNote }) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
          <button
            onClick={() => setShowNote(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <MessageSquarePlus size={20} className="text-gray-500" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Add Note
              </h3>
              <p className="text-sm text-gray-500">
                Internal note — not visible to customer.
              </p>
            </div>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a note about this order…"
            rows={4}
            className="w-full text-sm border border-gray-200 rounded p-3 resize-none focus:outline-none focus:border-gray-400 mb-4"
          />
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowNote(false);
                setNote("");
              }}
              className="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNote}
              disabled={!note.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Send size={14} />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
