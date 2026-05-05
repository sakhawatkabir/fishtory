"use client";
import { useState } from "react";
import { SettingsSection, Field, inputCls } from "./SettingsSection";
import Toast from "./Toast";

export default function StoreSettings() {
  const [form, setForm] = useState({
    storeName: "Fish Tory",
    storeEmail: "hello@fishtory.co.uk",
    storePhone: "+44 20 7946 0958",
    address: "14 Harbour Lane, London, EC1A 1BB",
    currency: "GBP",
    timezone: "Europe/London",
    orderPrefix: "ORD",
    taxRate: "20",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast("Store settings saved.");
    }, 700);
  };

  return (
    <div className="space-y-5">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      <SettingsSection
        title="Store Information"
        description="Basic details about your store."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Store Name">
            <input
              className={inputCls}
              value={form.storeName}
              onChange={set("storeName")}
            />
          </Field>
          <Field label="Contact Email">
            <input
              className={inputCls}
              type="email"
              value={form.storeEmail}
              onChange={set("storeEmail")}
            />
          </Field>
          <Field label="Phone Number">
            <input
              className={inputCls}
              value={form.storePhone}
              onChange={set("storePhone")}
            />
          </Field>
          <Field label="Address">
            <input
              className={inputCls}
              value={form.address}
              onChange={set("address")}
            />
          </Field>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Regional"
        description="Currency, timezone, and tax settings."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Currency">
            <select
              className={inputCls}
              value={form.currency}
              onChange={set("currency")}
            >
              <option value="GBP">GBP — British Pound (£)</option>
              <option value="USD">USD — US Dollar ($)</option>
              <option value="EUR">EUR — Euro (€)</option>
            </select>
          </Field>
          <Field label="Timezone">
            <select
              className={inputCls}
              value={form.timezone}
              onChange={set("timezone")}
            >
              <option value="Europe/London">Europe/London (GMT+0)</option>
              <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
              <option value="America/New_York">America/New_York (GMT-5)</option>
            </select>
          </Field>
          <Field label="Order ID Prefix" hint="e.g. ORD → #ORD-1001">
            <input
              className={inputCls}
              value={form.orderPrefix}
              onChange={set("orderPrefix")}
            />
          </Field>
          <Field
            label="Default Tax Rate (%)"
            hint="Applied to all products unless overridden."
          >
            <input
              className={inputCls}
              type="number"
              min="0"
              max="100"
              value={form.taxRate}
              onChange={set("taxRate")}
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
}
