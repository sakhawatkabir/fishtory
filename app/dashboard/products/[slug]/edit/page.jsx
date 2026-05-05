import { allProducts } from "@/lib/data/products";
import ProductForm from "@/components/dashboard/ProductForm";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `Edit: ${product.name} | Fish Tory Admin` };
}

export default function EditProductPage({ params }) {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return <ProductForm mode="edit" initialData={product} />;
}
