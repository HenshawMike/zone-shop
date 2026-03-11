"use client"

import { useEffect } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { AddProductDialog } from "./add-product-dialog"
import { EditProductDialog } from "./edit-product-dialog"
import { DeleteProductAlert } from "./delete-product-alert"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminClient({ products }: { products: Product[] }) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel("admin-products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center pb-8 border-b border-zinc-900">
        <h1 className="text-2xl font-light uppercase tracking-widest text-white">Inventory</h1>
        <AddProductDialog />
      </div>

      <div className="hidden md:block">
        <Table className="border-collapse">
          <TableHeader>
            <TableRow className="border-zinc-900 hover:bg-transparent">
              <TableHead className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Image</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Product</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Price</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Category</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Status</TableHead>
              <TableHead className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-zinc-900 hover:bg-zinc-900/30 transition-colors">
                <TableCell>
                  {product.image ? (
                    <div className="relative w-12 h-12 grayscale">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-none contrast-125"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center text-[8px] uppercase tracking-tighter text-zinc-600">
                      Empty
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-light tracking-wide text-zinc-300">{product.name}</TableCell>
                <TableCell className="font-light text-zinc-400 font-mono text-sm">₦{product.price.toLocaleString()}</TableCell>
                <TableCell className="text-[10px] uppercase tracking-widest text-zinc-500">{product.category}</TableCell>
                <TableCell>
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border ${product.is_available ? "border-zinc-700 text-zinc-400" : "border-zinc-900 text-zinc-700"
                    }`}>
                    {product.is_available ? "Active" : "Archived"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3 text-zinc-500">
                    <EditProductDialog product={product} />
                    <DeleteProductAlert productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Inventory View */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="p-6 border border-zinc-900 flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative w-16 h-16 grayscale flex-shrink-0">
                {product.image ? (
                  <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-[8px] uppercase text-zinc-600">NULL</div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-widest text-white">{product.name}</h3>
                <p className="text-sm font-light text-zinc-500">₦{product.price.toLocaleString()}</p>
                <p className="text-[8px] uppercase tracking-widest text-zinc-600">{product.category}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-4">
              <span className={`text-[8px] uppercase tracking-widest px-1.5 py-0.5 border ${product.is_available ? "border-zinc-700 text-zinc-400" : "border-zinc-900 text-zinc-700"
                }`}>
                {product.is_available ? "A" : "I"}
              </span>
              <div className="flex gap-2">
                <EditProductDialog product={product} />
                <DeleteProductAlert productId={product.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
