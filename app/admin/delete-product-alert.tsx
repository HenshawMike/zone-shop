"use client"

import { deleteProduct } from "@/lib/actions/products"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function DeleteProductAlert({ productId }: { productId: number }) {
  const handleDelete = async () => {
    await deleteProduct(productId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white hover:bg-zinc-900 transition-all">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black border-zinc-900 rounded-none p-12">
        <AlertDialogHeader className="mb-8">
          <AlertDialogTitle className="text-xl font-light uppercase tracking-widest text-white">Permanently Remove?</AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-zinc-500 uppercase tracking-tighter">
            This action is irreversible. The record will be purged from the archive.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel className="bg-transparent border-zinc-900 text-zinc-500 hover:bg-zinc-900 hover:text-white rounded-none text-[10px] uppercase tracking-widest h-12 transition-all">
            Abort
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-white text-black hover:bg-zinc-200 rounded-none text-[10px] uppercase tracking-widest h-12 transition-all shadow-none">
            Purge Record
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
