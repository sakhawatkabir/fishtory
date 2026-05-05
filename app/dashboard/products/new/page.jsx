import ProductForm from "@/components/dashboard/ProductForm";

export const metadata = {
  title: "Add Product | Fish Tory Admin",
};

export default function NewProductPage() {
  return <ProductForm mode="create" />;
}
