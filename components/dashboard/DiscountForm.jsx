"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  AlertTriangle,
  CheckCircle2,
  Tag,
} from "lucide-react";

const inputCls = (err) =>
  `w-full px-3 py-2 text-sm border rounded focus:outline-none focus:border-gray-400 transition-colors ${err ? "border-red-300 bg-red-50" : "border-gray-200"}`;

function Field({ label, required, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const DiscountForm = ({ initialData, mode = "create" }) => {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    code: initialData?.code ?? "",
    type: initialData?.type ?? "Percentage",
    value: initialData?.value !== undefined ? String(initialData.value) : "",
    minOrder:
      initialData?.minOrder !== undefined ? String(initialData.minOrder) : "0",
    maxUses:
      initialData?.maxUses !== undefined ? String(initialData.maxUses) : "",
    status: initialData?.status ?? "Active",
    expires: initialData?.expires ?? "",
    description: initialData?.description ?? "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const code = Array.from(
      { length: 8 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
    setForm((p) => ({ ...p, code }));
    if (errors.code) setErrors((p) => ({ ...p, code: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.code.trim()) e.code = "Code is required.";
    if (!form.value.trim() && form.type !== "Shipping")
      e.value = "Value is required.";
    else if (
      form.type !== "Shipping" &&
      (isNaN(parseFloat(form.value)) || parseFloat(form.value) <= 0)
    )
      e.value = "Enter a valid value.";
    if (
      !form.maxUses.trim() ||
      isNaN(parseInt(form.maxUses)) ||
      parseInt(form.maxUses) <= 0
    )
      e.maxUses = "Enter a valid max uses number.";
    if (!form.expires.trim()) e.expires = "Expiry date is required.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setToast({ msg: "Please fix the errors below.", type: "error" });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast({
        msg: isEdit ? "Discount updated." : "Discount created.",
        type: "success",
      });
      setTimeout(() => router.push("/dashboard/discounts"), 1000);
    }, 700);
  };

  const valueLabel =
    form.type === "Percentage"
      ? "Discount (%)"
      : form.type === "Fixed"
        ? "Discount (£)"
        : null;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${toast.type === "error" ? "bg-red-500" : "bg-[#2f3a32]"}`}
        >
          {toast.type === "error" ? (
            <AlertTriangle size={15} />
          ) : (
            <CheckCircle2 size={15} />
          )}
          {toast.msg}
        </div>
      )}

      {/* Back */}
      <Link
        href="/dashboard/discounts"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to Discounts
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? `Edit: ${initialData?.code}` : "Create Discount"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isEdit
            ? "Update the discount details below."
            : "Set up a new discount code for your store."}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main fields */}
          <div className="lg:col-span-2 space-y-5">
            {/* Code */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Discount Code
              </h2>
              <Field
                label="Code"
                required
                error={errors.code}
                hint="Customers enter this at checkout. Use uppercase letters and numbers."
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => {
                      setForm((p) => ({
                        ...p,
                        code: e.target.value.toUpperCase(),
                      }));
                      if (errors.code) setErrors((p) => ({ ...p, code: "" }));
                    }}
                    placeholder="e.g. SUMMER20"
                    className={`${inputCls(errors.code)} flex-1 font-mono`}
                  />
                  <button
                    type="button"
                    onClick={generateCode}
                    className="px-3 py-2 text-xs font-medium border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              </Field>
              <Field
                label="Description"
                hint="Internal note — not shown to customers."
              >
                <input
                  type="text"
                  value={form.description}
                  onChange={set("description")}
                  placeholder="e.g. Summer sale promotion"
                  className={inputCls(false)}
                />
              </Field>
            </section>

            {/* Value */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Discount Value
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Type" required>
                  <select
                    value={form.type}
                    onChange={set("type")}
                    className={inputCls(false)}
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed">Fixed Amount (£)</option>
                    <option value="Shipping">Free Shipping</option>
                  </select>
                </Field>
                {valueLabel && (
                  <Field label={valueLabel} required error={errors.value}>
                    <input
                      type="number"
                      min="0"
                      step={form.type === "Percentage" ? "1" : "0.01"}
                      max={form.type === "Percentage" ? "100" : undefined}
                      value={form.value}
                      onChange={set("value")}
                      placeholder={form.type === "Percentage" ? "10" : "5.00"}
                      className={inputCls(errors.value)}
                    />
                  </Field>
                )}
              </div>
            </section>

            {/* Rules */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Usage Rules
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Minimum Order (£)"
                  hint="Set to 0 for no minimum."
                >
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.minOrder}
                    onChange={set("minOrder")}
                    placeholder="0"
                    className={inputCls(false)}
                  />
                </Field>
                <Field
                  label="Maximum Uses"
                  required
                  error={errors.maxUses}
                  hint="Total number of times this code can be used."
                >
                  <input
                    type="number"
                    min="1"
                    value={form.maxUses}
                    onChange={set("maxUses")}
                    placeholder="100"
                    className={inputCls(errors.maxUses)}
                  />
                </Field>
              </div>
            </section>
          </div>

          {/* Right: status + dates + submit */}
          <div className="space-y-5">
            {/* Status & expiry */}
            <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status & Validity
              </h2>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={set("status")}
                  className={inputCls(false)}
                >
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Expired">Expired</option>
                </select>
              </Field>
              <Field label="Expiry Date" required error={errors.expires}>
                <input
                  type="text"
                  value={form.expires}
                  onChange={set("expires")}
                  placeholder="31 Dec 2026"
                  className={inputCls(errors.expires)}
                />
              </Field>
            </section>

            {/* Summary */}
            <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Summary
              </h2>
              <div className="space-y-2 text-sm">
                {[
                  ["Code", form.code || "—"],
                  ["Type", form.type],
                  [
                    "Value",
                    form.type === "Shipping"
                      ? "Free"
                      : form.type === "Percentage"
                        ? `${form.value || "—"}%`
                        : `£${form.value || "—"}`,
                  ],
                  [
                    "Min Order",
                    form.minOrder > 0 ? `£${form.minOrder}` : "None",
                  ],
                  ["Max Uses", form.maxUses || "—"],
                  ["Expires", form.expires || "—"],
                  ["Status", form.status],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-medium text-gray-900 text-right max-w-[140px] truncate">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit */}
            <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    {isEdit ? "Save Changes" : "Create Discount"}
                  </>
                )}
              </button>
              <Link
                href="/dashboard/discounts"
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </Link>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DiscountForm;
