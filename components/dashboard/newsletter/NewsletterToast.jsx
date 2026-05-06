import { AlertTriangle, CheckCircle2 } from "lucide-react";

const NewsletterToast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white ${
        toast.type === "error" ? "bg-red-500" : "bg-[#2f3a32]"
      }`}
    >
      {toast.type === "error" ? (
        <AlertTriangle size={15} />
      ) : (
        <CheckCircle2 size={15} />
      )}
      {toast.msg}
    </div>
  );
};

export default NewsletterToast;
