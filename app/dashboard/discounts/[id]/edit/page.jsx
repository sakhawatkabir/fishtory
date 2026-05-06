import { allDiscounts } from "@/lib/data/discounts";
import DiscountForm from "@/components/dashboard/DiscountForm";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allDiscounts.map((d) => ({ id: String(d.id) }));
}

export async function generateMetadata({ params }) {
  const discount = allDiscounts.find((d) => d.id === Number(params.id));
  if (!discount) return { title: "Discount Not Found" };
  return { title: `Edit: ${discount.code} | Fish Tory Admin` };
}

const EditDiscountPage = ({ params }) => {
  const discount = allDiscounts.find((d) => d.id === Number(params.id));
  if (!discount) notFound();
  return <DiscountForm mode="edit" initialData={discount} />;
};

export default EditDiscountPage;
