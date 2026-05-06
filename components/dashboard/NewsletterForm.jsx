"use client";
import { useState } from "react";
import NewsletterToast from "./newsletter/NewsletterToast";
import NewsletterPreview from "./newsletter/NewsletterPreview";
import NewsletterTemplatePicker from "./newsletter/NewsletterTemplatePicker";
import NewsletterSubject from "./newsletter/NewsletterSubject";
import NewsletterBody from "./newsletter/NewsletterBody";
import NewsletterAudience from "./newsletter/NewsletterAudience";

const TEMPLATE_CONTENT = {
  promo: {
    subject: "Exclusive offer just for you 🎣",
    body: "<h2>A special offer, just for you</h2><p>As a valued Fish Tory customer, we're giving you <strong>15% off</strong> your next order. Use code <strong>LOYAL15</strong> at checkout.</p><p>Shop our freshest catches today — limited stock available.</p>",
  },
  newproduct: {
    subject: "New arrival: Fresh from the sea",
    body: "<h2>Just landed in our shop</h2><p>We're excited to introduce our latest catch — sustainably sourced and delivered fresh to your door.</p><p>Be the first to try it before it sells out.</p>",
  },
  seasonal: {
    subject: "Summer seafood — now in season",
    body: "<h2>Summer is here 🌊</h2><p>The warmer months bring the best catches of the year. From hand-dived scallops to line-caught sea bass, our seasonal selection is now live.</p><p>Order before noon for next-day delivery.</p>",
  },
};

const SEGMENTS = [
  { value: "all", label: "All Subscribers", count: 1284 },
  { value: "active", label: "Active Customers", count: 847 },
  { value: "inactive", label: "Inactive (90+ days)", count: 312 },
  { value: "new", label: "New (last 30 days)", count: 125 },
];

const EMPTY = {
  subject: "",
  preheader: "",
  segment: "all",
  body: "",
  template: "",
};

const NewsletterForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Generic field change handler — returns an onChange-compatible function
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleTemplateChange = (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      template: val,
      ...(TEMPLATE_CONTENT[val] ?? { subject: "", body: "" }),
    }));
    setErrors({});
  };

  const handleBodyChange = (val) => {
    setForm((prev) => ({ ...prev, body: val }));
    if (errors.body) setErrors((prev) => ({ ...prev, body: "" }));
  };

  const handleSegmentChange = (val) => {
    setForm((prev) => ({ ...prev, segment: val }));
  };

  const validate = () => {
    const e = {};
    if (!form.subject.trim()) e.subject = "Subject line is required.";
    if (!form.body.replace(/<[^>]*>/g, "").trim())
      e.body = "Email body cannot be empty.";
    return e;
  };

  const handleSend = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      showToast("Please fix the errors before sending.", "error");
      return;
    }
    setSending(true);
    const recipient = SEGMENTS.find((s) => s.value === form.segment);
    setTimeout(() => {
      setSending(false);
      showToast(
        `Newsletter sent to ${recipient.count.toLocaleString()} subscribers.`,
      );
      setForm(EMPTY);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <NewsletterToast toast={toast} />

      {preview && (
        <NewsletterPreview form={form} onClose={() => setPreview(false)} />
      )}

      <form onSubmit={handleSend} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <NewsletterTemplatePicker
              value={form.template}
              onChange={handleTemplateChange}
            />
            <NewsletterSubject
              subject={form.subject}
              preheader={form.preheader}
              errors={errors}
              onChange={handleChange}
            />
            <NewsletterBody
              body={form.body}
              error={errors.body}
              onChange={handleBodyChange}
            />
          </div>

          <NewsletterAudience
            segment={form.segment}
            subject={form.subject}
            body={form.body}
            sending={sending}
            onSegmentChange={handleSegmentChange}
            onPreview={() => setPreview(true)}
          />
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;
