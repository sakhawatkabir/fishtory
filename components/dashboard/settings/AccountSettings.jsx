"use client";
import { useState } from "react";
import { SettingsSection, Field, inputCls } from "./SettingsSection";
import Toast from "./Toast";

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@fishtory.co.uk",
    role: "Administrator",
    avatar: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast("Account updated.");
    }, 700);
  };

  return (
    <div className="space-y-5">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      <SettingsSection
        title="Profile"
        description="Your personal account details."
      >
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#2f3a32] text-white flex items-center justify-center text-lg font-bold shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            <p className="text-xs text-gray-400">{profile.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <Field label="Full Name">
            <input
              className={inputCls}
              value={profile.name}
              onChange={set("name")}
            />
          </Field>
          <Field label="Email Address">
            <input
              className={inputCls}
              type="email"
              value={profile.email}
              onChange={set("email")}
            />
          </Field>
          <Field label="Role">
            <input
              className={`${inputCls} bg-gray-50 text-gray-400`}
              value={profile.role}
              disabled
            />
          </Field>
        </div>
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

export default AccountSettings;
