import { Users, Send, Eye } from "lucide-react";

const SEGMENTS = [
  { value: "all", label: "All Subscribers", count: 1284 },
  { value: "active", label: "Active Customers", count: 847 },
  { value: "inactive", label: "Inactive (90+ days)", count: 312 },
  { value: "new", label: "New (last 30 days)", count: 125 },
];

const NewsletterAudience = ({
  segment,
  subject,
  body,
  sending,
  onSegmentChange,
  onPreview,
}) => {
  const selected = SEGMENTS.find((s) => s.value === segment);
  const bodyText = body.replace(/<[^>]*>/g, "").trim();

  return (
    <div className="space-y-6">
      {/* Audience selector */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Audience
        </h2>
        <div className="space-y-2">
          {SEGMENTS.map((seg) => (
            <button
              key={seg.value}
              type="button"
              onClick={() => onSegmentChange(seg.value)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded border text-sm transition-colors cursor-pointer ${
                segment === seg.value
                  ? "border-[#2f3a32] bg-[#2f3a32]/5 text-gray-900"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <span className="font-medium">{seg.label}</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  segment === seg.value
                    ? "bg-[#2f3a32] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {seg.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-1 text-sm text-gray-500">
          <Users size={14} />
          <span>
            Sending to{" "}
            <span className="font-semibold text-gray-900">
              {selected.count.toLocaleString()}
            </span>{" "}
            recipients
          </span>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Summary
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-2">
            <span className="text-gray-500 shrink-0">Subject</span>
            <span className="text-gray-900 font-medium text-right truncate max-w-[160px]">
              {subject || "—"}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-gray-500 shrink-0">Segment</span>
            <span className="text-gray-900 font-medium text-right">
              {selected.label}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-gray-500 shrink-0">Recipients</span>
            <span className="text-gray-900 font-medium">
              {selected.count.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-gray-500 shrink-0">Body</span>
            <span
              className={`font-medium ${bodyText ? "text-emerald-600" : "text-gray-400"}`}
            >
              {bodyText ? "Ready" : "Empty"}
            </span>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <button
          type="submit"
          disabled={sending}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#2f3a32] text-white rounded hover:bg-[#1e2820] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {sending ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={15} />
              Send Newsletter
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onPreview}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-gray-200 rounded text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Eye size={15} />
          Preview Email
        </button>
      </section>
    </div>
  );
};

export default NewsletterAudience;
