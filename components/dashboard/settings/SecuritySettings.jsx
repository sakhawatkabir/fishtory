"use client";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import {
  SettingsSection,
  Field,
  inputCls,
} from "./SettingsSection";
import Toast from "./Toast";
import Toggle from "./Toggle";

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [twoFa, setTwoFa] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});

  const setP = (k) => (e) =>
    setPasswords((p) => ({ ...p, [k]: e.target.value }));
  const toggleShow = (k) => setShow((p) => ({ ...p, [k]: !p[k] }));

  const handleSave = () => {
    const errs = {};
    if (passwords.current || passwords.next || passwords.confirm) {
      if (!passwords.current) errs.current = "Enter your current password.";
      if (passwords.next.length < 8)
        errs.next = "Password must be at least 8 characters.";
      if (passwords.next !== passwords.confirm)
        errs.confirm = "Passwords do not match.";
    }
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setPasswords({ current: "", next: "", confirm: "" });
      setToast("Security settings updated.");
    }, 700);
  };

  const PasswordField = ({ label, field }) => (
    <Field label={label} error={errors[field]}>
      <div className="relative">
        <input
          type={show[field] ? "text" : "password"}
          value={passwords[field]}
          onChange={setP(field)}
          className={`${inputCls} pr-10 ${errors[field] ? "border-red-300 bg-red-50" : ""}`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => toggleShow(field)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {show[field] ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {errors[field] && (
        <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
      )}
    </Field>
  );

  return (
    <div className="space-y-5">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      <SettingsSection
        title="Change Password"
        description="Use a strong password of at least 8 characters."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PasswordField label="Current Password" field="current" />
          <div /> {/* spacer */}
          <PasswordField label="New Password" field="next" />
          <PasswordField label="Confirm Password" field="confirm" />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account."
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              Authenticator App
            </p>
            <p className="text-xs text-gray-400">
              Use an app like Google Authenticator or Authy.
            </p>
          </div>
          <Toggle label="" checked={twoFa} onChange={setTwoFa} />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Session"
        description="Control how long you stay logged in."
      >
        <Field
          label="Session Timeout"
          hint="Automatically log out after this period of inactivity."
        >
          <select
            className={inputCls}
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="240">4 hours</option>
            <option value="0">Never</option>
          </select>
        </Field>
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

export default SecuritySettings;
