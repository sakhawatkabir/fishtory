import NewsletterForm from "@/components/dashboard/NewsletterForm";

export const metadata = {
  title: "Send Newsletter | Fish Tory Admin",
};

const NewsletterPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Send Newsletter</h1>
        <p className="text-sm text-gray-500 mt-1">
          Compose and send an email campaign to your subscribers.
        </p>
      </div>
      <NewsletterForm />
    </div>
  );
};

export default NewsletterPage;
