"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { AddProductDialog } from "./add-product-dialog"
import { EditProductDialog } from "./edit-product-dialog"
import { DeleteProductAlert } from "./delete-product-alert"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminClient({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts)

  return (
    <div>
      <div className="flex justify-end mb-4">
        <AddProductDialog />
      </div>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image ? (
                    <div className="relative w-16 h-16">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-500">
                      No Image
                    </div>
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>₦{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.is_available ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <EditProductDialog product={product} />
                    <DeleteProductAlert productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card List */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              {product.image ? (
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 bg-zinc-800 rounded-md flex items-center justify-center text-xs text-zinc-500 flex-shrink-0">
                  No Image
                </div>
              )}
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-red-600 font-semibold text-md">₦{product.price.toLocaleString()}</p>
                {product.category && <p className="text-sm text-zinc-400">{product.category}</p>}
                <p className="text-sm">
                  Available: <span className={product.is_available ? 'text-green-500' : 'text-red-500'}>{product.is_available ? "Yes" : "No"}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
              <EditProductDialog product={product} />
              <DeleteProductAlert productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
