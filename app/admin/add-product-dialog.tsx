"use client"

import { useState } from "react"
import { addProduct } from "@/lib/actions/products"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AddProductDialog() {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        setError("File size must be less than 20MB.")
        setPreview(null)
        e.target.value = "" // Reset file input
        return
      }
      setError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    const imageFile = formData.get('image') as File
    if (imageFile && imageFile.size > 20 * 1024 * 1024) {
        setError("File size must be less than 20MB.")
        return
    }

    await addProduct(formData)
    setOpen(false)
    setPreview(null)
    setError(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details of the new product. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="name" className="text-left sm:text-right">
                Name
              </Label>
              <Input id="name" name="name" className="sm:col-span-3" required />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="price" className="text-left sm:text-right">
                Price
              </Label>
              <Input id="price" name="price" type="number" step="0.01" className="sm:col-span-3" required />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="category" className="text-left sm:text-right">
                Category
              </Label>
              <Input id="category" name="category" className="sm:col-span-3" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="description" className="text-left sm:text-right">
                Description
              </Label>
              <Textarea id="description" name="description" className="sm:col-span-3" />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="image" className="text-left sm:text-right">
                Image
              </Label>
              <Input id="image" name="image" type="file" className="sm:col-span-3" accept="image/*" onChange={handleFileChange} />
            </div>
            {error && <p className="col-span-4 text-red-500 text-sm text-center">{error}</p>}
            {preview && (
              <div className="col-span-4">
                <Label className="text-center block mb-2">Image Preview</Label>
                <div className="relative w-full h-48">
                  <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
