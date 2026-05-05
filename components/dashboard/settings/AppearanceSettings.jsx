"use client";
import { useState } from "react";
import { Monitor, Sun, Moon, Check } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import Toast from "./Toast";
import Toggle from "./Toggle";

const THEMES = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

const ACCENT_COLORS = [
  { id: "forest", label: "Forest", color: "#2f3a32" },
  { id: "blue", label: "Ocean", color: "#2563eb" },
  { id: "purple", label: "Violet", color: "#7c3aed" },
  { id: "rose", label: "Rose", color: "#e11d48" },
  { id: "amber", label: "Amber", color: "#d97706" },
];

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("forest");
  const [compactMode, setCompactMode] = useState(false);
  const [sidebarIcons, setSidebarIcons] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast("Appearance settings saved.");
    }, 700);
  };

  return (
    <div className="space-y-5">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      <SettingsSection
        title="Theme"
        description="Choose how the dashboard looks."
      >
        <div className="flex gap-3 flex-wrap">
          {THEMES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`flex flex-col items-center gap-2 px-5 py-4 rounded-lg border-2 text-sm font-medium transition-colors cursor-pointer ${
                theme === id
                  ? "border-[#2f3a32] bg-[#2f3a32]/5 text-[#2f3a32]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Accent Colour"
        description="Personalise the primary colour used across the dashboard."
      >
        <div className="flex gap-3 flex-wrap">
          {ACCENT_COLORS.map(({ id, label, color }) => (
            <button
              key={id}
              onClick={() => setAccent(id)}
              title={label}
              className="relative w-9 h-9 rounded-full border-2 transition-all cursor-pointer"
              style={{
                backgroundColor: color,
                borderColor: accent === id ? color : "transparent",
                outline: accent === id ? `3px solid ${color}33` : "none",
                outlineOffset: "2px",
              }}
            >
              {accent === id && (
                <Check
                  size={14}
                  className="absolute inset-0 m-auto text-white"
                  strokeWidth={3}
                />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">
          Selected:{" "}
          <span className="font-medium text-gray-600">
            {ACCENT_COLORS.find((c) => c.id === accent)?.label}
          </span>
        </p>
      </SettingsSection>

      <SettingsSection
        title="Layout"
        description="Adjust the dashboard layout and density."
      >
        <Toggle
          label="Compact Mode"
          description="Reduce padding and spacing for a denser layout."
          checked={compactMode}
          onChange={setCompactMode}
        />
        <Toggle
          label="Show Sidebar Labels"
          description="Display text labels next to sidebar icons."
          checked={sidebarIcons}
          onChange={setSidebarIcons}
        />
      </SettingsSection>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {saving ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
