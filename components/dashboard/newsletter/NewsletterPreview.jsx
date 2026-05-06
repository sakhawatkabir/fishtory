import { X } from "lucide-react";

const NewsletterPreview = ({ form, onClose }) => {
  return (
    <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Email Preview</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 space-y-4">
          {/* Meta */}
          <div className="bg-gray-50 rounded p-4 space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Subject
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {form.subject || "(no subject)"}
            </p>
            {form.preheader && (
              <>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-2">
                  Preheader
                </p>
                <p className="text-sm text-gray-600">{form.preheader}</p>
              </>
            )}
          </div>

          {/* Email body */}
          <div className="border border-gray-200 rounded p-5">
            <div className="mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
              <div className="w-7 h-7 bg-[#2f3a32] rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">FT</span>
              </div>
              <span className="text-sm font-bold text-gray-900">Fish Tory</span>
            </div>
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: form.body || "<p><em>No content yet.</em></p>",
              }}
            />
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center">
              Fish Tory · You&apos;re receiving this because you subscribed.
              <br />
              <span className="underline cursor-pointer">Unsubscribe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPreview;
