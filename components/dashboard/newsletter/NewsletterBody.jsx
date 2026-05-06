import RichTextEditor from "../RichTextEditor";

function Field({ label, required, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const NewsletterBody = ({ body, error, onChange }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
        Email Body
      </h2>
      <Field label="Content" required error={error}>
        <RichTextEditor value={body} onChange={onChange} error={error} />
      </Field>
    </section>
  );
};

export default NewsletterBody;
