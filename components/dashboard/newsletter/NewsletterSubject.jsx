function Field({ label, required, error, hint, children }) {
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

const NewsletterSubject = ({ subject, preheader, errors, onChange }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
        Subject
      </h2>

      <Field label="Subject Line" required error={errors.subject}>
        <input
          type="text"
          value={subject}
          onChange={onChange("subject")}
          placeholder="e.g. Fresh catch just landed — order now"
          className={inputCls(errors.subject)}
          maxLength={100}
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {subject.length}/100
        </p>
      </Field>

      <Field
        label="Preheader Text"
        hint="Short preview text shown after the subject in most email clients."
      >
        <input
          type="text"
          value={preheader}
          onChange={onChange("preheader")}
          placeholder="e.g. Sustainably sourced, delivered fresh to your door."
          className={inputCls(false)}
          maxLength={150}
        />
      </Field>
    </section>
  );
};

export default NewsletterSubject;
