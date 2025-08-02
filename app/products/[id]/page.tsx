import { createClient as createServerClient } from "@/lib/supabase/server";
import { createClient as createStaticClient } from "@/lib/supabase/static";
import ProductDetailClient from "./product-detail-client";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: products } = await supabase.from("products").select("id");
  return (
    (products ?? []).map((item: { id: string | number }) => ({
      id: String(item.id),
    }))
  );
}

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage(props: ProductPageProps) {
  const supabase = await createServerClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", props.params.id)
    .single();

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
