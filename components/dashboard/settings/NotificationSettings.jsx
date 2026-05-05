"use client";
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import Toast from "./Toast";
import Toggle from "./Toggle";

const NotificationSettings = () => {
  const [prefs, setPrefs] = useState({
    newOrder: true,
    orderShipped: true,
    orderCancelled: true,
    lowStock: true,
    outOfStock: true,
    newCustomer: false,
    weeklyReport: true,
    marketingEmails: false,
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const toggle = (k) => (val) => setPrefs((p) => ({ ...p, [k]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast("Notification preferences saved.");
    }, 700);
  };

  return (
    <div className="space-y-5">
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}

      <SettingsSection
        title="Order Notifications"
        description="Get notified about order activity."
      >
        <Toggle
          label="New Order Placed"
          description="When a customer places a new order."
          checked={prefs.newOrder}
          onChange={toggle("newOrder")}
        />
        <Toggle
          label="Order Shipped"
          description="When an order status changes to Shipped."
          checked={prefs.orderShipped}
          onChange={toggle("orderShipped")}
        />
        <Toggle
          label="Order Cancelled"
          description="When a customer cancels their order."
          checked={prefs.orderCancelled}
          onChange={toggle("orderCancelled")}
        />
      </SettingsSection>

      <SettingsSection
        title="Inventory Alerts"
        description="Stay on top of stock levels."
      >
        <Toggle
          label="Low Stock Warning"
          description="When a product drops below 20 units."
          checked={prefs.lowStock}
          onChange={toggle("lowStock")}
        />
        <Toggle
          label="Out of Stock Alert"
          description="When a product reaches 0 units."
          checked={prefs.outOfStock}
          onChange={toggle("outOfStock")}
        />
      </SettingsSection>

      <SettingsSection
        title="Other"
        description="Reports and marketing communications."
      >
        <Toggle
          label="New Customer Sign-up"
          description="When a new customer creates an account."
          checked={prefs.newCustomer}
          onChange={toggle("newCustomer")}
        />
        <Toggle
          label="Weekly Summary Report"
          description="A weekly digest of sales and performance."
          checked={prefs.weeklyReport}
          onChange={toggle("weeklyReport")}
        />
        <Toggle
          label="Marketing Emails"
          description="Promotions and product updates from us."
          checked={prefs.marketingEmails}
          onChange={toggle("marketingEmails")}
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

export default NotificationSettings;
