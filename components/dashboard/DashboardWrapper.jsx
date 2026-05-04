"use client";
import { useState } from "react";
import { Menu, Fish } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function DashboardWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1a2332] rounded flex items-center justify-center">
              <Fish size={14} className="text-white" />
            </div>
            <span className="text-base font-bold text-gray-900">Fish Tory</span>
          </Link>

          {/* Spacer to keep logo centered */}
          <div className="w-9" aria-hidden="true" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
