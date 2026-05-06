import { ChevronDown } from "lucide-react";

const TEMPLATES = [
  { value: "", label: "Blank — start from scratch" },
  { value: "promo", label: "Promotional Offer" },
  { value: "newproduct", label: "New Product Arrival" },
  { value: "seasonal", label: "Seasonal Campaign" },
];

const NewsletterTemplatePicker = ({ value, onChange }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
        Start with a Template
      </h2>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors pr-8 cursor-pointer"
        >
          {TEMPLATES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </section>
  );
};

export default NewsletterTemplatePicker;
