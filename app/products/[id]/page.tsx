import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createStaticClient } from "@/lib/supabase/static";
import ProductDetailClient from "./product-detail-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const supabase = createStaticClient();
    const { data: products, error } = await supabase.from("products").select("id");

    if (error) {
      console.error("Error fetching products for static params:", error);
      return [];
    }

    return (products ?? []).map((item: { id: string | number }) => ({
      id: String(item.id),
    }));
  } catch (err) {
    console.error("Unexpected error in generateStaticParams:", err);
    return [];
  }
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const supabase = await createServerClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
