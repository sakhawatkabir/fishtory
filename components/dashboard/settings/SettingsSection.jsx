
export function SettingsSection({ title, description, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {(title || description) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && (
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      )}
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors";
