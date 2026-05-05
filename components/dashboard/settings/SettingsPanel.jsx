"use client";
import { useState } from "react";
import { Store, User, Bell, Shield, Palette } from "lucide-react";
import StoreSettings from "./StoreSettings";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import AppearanceSettings from "./AppearanceSettings";

const TABS = [
  { id: "store", label: "Store", icon: Store },
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState("store");

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Tab nav */}
      <aside className="lg:w-52 shrink-0">
        <nav className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer border-b border-gray-100 last:border-0 ${
                activeTab === id
                  ? "bg-[#2f3a32] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Tab content */}
      <div className="flex-1 min-w-0">
        {activeTab === "store" && <StoreSettings />}
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
      </div>
    </div>
  );
};

export default SettingsPanel;
