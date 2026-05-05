"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Save,
  ArrowLeft,
  ImagePlus,
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";
import Link from "next/link";
import RichTextEditor from "./RichTextEditor";

const CATEGORIES = ["Fish", "Shellfish", "Smoked"];
const STATUSES = ["Active", "Low Stock", "Out of Stock"];

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function Field({ label, required, error, children, hint }) {
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

const inputCls = (err) =>
  `w-full px-3 py-2 text-sm border rounded focus:outline-none focus:border-gray-400 transition-colors ${
    err ? "border-red-300 bg-red-50" : "border-gray-200"
  }`;

export default function ProductForm({ initialData, mode = "create" }) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    sku: initialData?.sku ?? "",
    category: initialData?.category ?? "Fish",
    price: initialData?.priceNum ? String(initialData.priceNum) : "",
    stock: initialData?.stock !== undefined ? String(initialData.stock) : "",
    status: initialData?.status ?? "Active",
    description: initialData?.description ?? "",
    image: initialData?.image ?? "",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => {
      const next = { ...prev, [field]: val };
      if (field === "name" && !slugLocked) {
        next.slug = slugify(val);
      }
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required.";
    if (!form.slug.trim()) e.slug = "Slug is required.";
    if (!form.sku.trim()) e.sku = "SKU is required.";
    if (!form.price.trim()) e.price = "Price is required.";
    else if (isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0)
      e.price = "Enter a valid price.";
    if (form.stock === "") e.stock = "Stock is required.";
    else if (isNaN(parseInt(form.stock, 10)) || parseInt(form.stock, 10) < 0)
      e.stock = "Enter a valid stock number.";
    if (!form.description.replace(/<[^>]*>/g, "").trim())
      e.description = "Description is required.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      showToast("Please fix the errors below.", "error");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast(
        isEdit
          ? "Product updated successfully."
          : "Product created successfully.",
      );
      setTimeout(() => router.push("/dashboard/products"), 1200);
    }, 800);
  };

  const previewImage = form.image || null;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
            toast.type === "error"
              ? "bg-red-500"
              : toast.type === "warning"
                ? "bg-amber-500"
                : "bg-[#2f3a32]"
          }`}
        >
          {toast.type === "error" || toast.type === "warning" ? (
            <AlertTriangle size={15} />
          ) : (
            <CheckCircle2 size={15} />
          )}
          {toast.msg}
        </div>
      )}

      {/* Back */}
      <Link
        href={
          isEdit
            ? `/dashboard/products/${initialData?.slug}`
            : "/dashboard/products"
        }
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
        {isEdit ? "Back to Product" : "Back to Products"}
      </Link>

      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? `Edit: ${initialData?.name}` : "Add New Product"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isEdit
            ? "Update the product details below."
            : "Fill in the details to add a new product to your catalogue."}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: main fields ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Basic Information
              </h2>

              <Field label="Product Name" required error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Wild Salmon Fillets (2pcs)"
                  className={inputCls(errors.name)}
                />
              </Field>

              <Field
                label="Slug"
                required
                error={errors.slug}
                hint="Used in the URL. Auto-generated from name."
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.slug}
                    onChange={set("slug")}
                    disabled={slugLocked}
                    placeholder="wild-salmon-fillets-2pcs"
                    className={`${inputCls(errors.slug)} flex-1 ${slugLocked ? "bg-gray-50 text-gray-400" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setSlugLocked((l) => !l)}
                    className="px-3 py-2 text-xs font-medium border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {slugLocked ? "Edit" : "Lock"}
                  </button>
                </div>
              </Field>

              <Field label="Description" required error={errors.description}>
                <RichTextEditor
                  value={form.description}
                  onChange={(val) => {
                    setForm((prev) => ({ ...prev, description: val }));
                    if (errors.description)
                      setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                  error={errors.description}
                />
              </Field>
            </section>

            {/* Pricing & inventory */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Price (£)" required error={errors.price}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      £
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={set("price")}
                      placeholder="0.00"
                      className={`${inputCls(errors.price)} pl-7`}
                    />
                  </div>
                </Field>

                <Field label="Stock Quantity" required error={errors.stock}>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={set("stock")}
                    placeholder="0"
                    className={inputCls(errors.stock)}
                  />
                </Field>

                <Field
                  label="SKU"
                  required
                  error={errors.sku}
                  hint="Unique product identifier."
                >
                  <input
                    type="text"
                    value={form.sku}
                    onChange={set("sku")}
                    placeholder="SKU-001"
                    className={inputCls(errors.sku)}
                  />
                </Field>
              </div>
            </section>

            {/* Image */}
            <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Product Image
              </h2>

              <Field
                label="Image Path"
                error={errors.image}
                hint="Enter a path from /public, e.g. /images/product1.webp"
              >
                <input
                  type="text"
                  value={form.image}
                  onChange={set("image")}
                  placeholder="/images/product1.webp"
                  className={inputCls(errors.image)}
                />
              </Field>

              {/* Preview */}
              <div
                className={`relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed flex items-center justify-center ${
                  previewImage
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={() => setForm((p) => ({ ...p, image: "" }))}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, image: "" }))}
                      className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <ImagePlus size={28} />
                    <p className="text-xs">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* ── Right: + submit ── */}
          <div className="space-y-6">
            {/*  */}
            <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Organisation
              </h2>

              <Field label="Category" required>
                <select
                  value={form.category}
                  onChange={set("category")}
                  className={inputCls(false)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Status" required>
                <select
                  value={form.status}
                  onChange={set("status")}
                  className={inputCls(false)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </section>

            {/* Summary card */}
            <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Summary
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="text-gray-900 font-medium truncate max-w-[140px] text-right">
                    {form.name || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price</span>
                  <span className="text-gray-900 font-medium">
                    {form.price ? `£${parseFloat(form.price).toFixed(2)}` : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stock</span>
                  <span
                    className={`font-medium ${
                      form.stock === "0"
                        ? "text-red-500"
                        : parseInt(form.stock) < 20
                          ? "text-amber-600"
                          : "text-gray-900"
                    }`}
                  >
                    {form.stock !== "" ? form.stock : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="text-gray-900 font-medium">
                    {form.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-gray-900 font-medium">
                    {form.status}
                  </span>
                </div>
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
                    {isEdit ? "Save Changes" : "Create Product"}
                  </>
                )}
              </button>

              <Link
                href={
                  isEdit
                    ? `/dashboard/products/${initialData?.slug}`
                    : "/dashboard/products"
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </Link>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}
