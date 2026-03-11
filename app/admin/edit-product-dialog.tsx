"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import { updateProduct } from "@/lib/actions/products"
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

export function EditProductDialog({ product }: { product: Product }) {
    const [open, setOpen] = useState(false)
    const [preview, setPreview] = useState<string | null>(product.image)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 20 * 1024 * 1024) { // 20MB limit
                setError("File size must be less than 20MB.")
                setPreview(product.image) // Revert to original image on error
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
            setPreview(product.image)
        }
    }

    const handleSubmit = async (formData: FormData) => {
        const imageFile = formData.get('image') as File
        if (imageFile && imageFile.size > 20 * 1024 * 1024) {
            setError("File size must be less than 20MB.")
            return
        }

        await updateProduct(product.id, formData)
        setOpen(false)
        setError(null)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-none text-[10px] uppercase tracking-widest border-white text-white hover:bg-white hover:text-black transition-all">Edit</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg bg-black border-zinc-900 rounded-none p-12">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-xl font-light uppercase tracking-widest text-white">Modify Entry</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500 uppercase tracking-tighter">
                        Update the specifications of this archive.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                Name
                            </Label>
                            <Input id="name" name="name" defaultValue={product.name} className="bg-transparent border-zinc-800 rounded-none text-sm focus-visible:ring-0 focus-visible:border-white transition-colors h-12" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                Price (₦)
                            </Label>
                            <Input id="price" name="price" type="number" step="1" defaultValue={product.price} className="bg-transparent border-zinc-800 rounded-none text-sm focus-visible:ring-0 focus-visible:border-white transition-colors h-12" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                Category
                            </Label>
                            <Input id="category" name="category" defaultValue={product.category ?? ""} className="bg-transparent border-zinc-800 rounded-none text-sm focus-visible:ring-0 focus-visible:border-white transition-colors h-12" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                Description
                            </Label>
                            <Textarea id="description" name="description" defaultValue={product.description ?? ""} className="bg-transparent border-zinc-800 rounded-none text-sm focus-visible:ring-0 focus-visible:border-white transition-colors min-h-[100px] resize-none" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                Visual Update
                            </Label>
                            <Input id="image" name="image" type="file" className="bg-transparent border-zinc-800 rounded-none text-sm h-12 file:bg-zinc-900 file:text-zinc-500 file:text-[10px] file:uppercase file:tracking-widest file:border-none file:h-full file:mr-4" accept="image/*" onChange={handleFileChange} />
                        </div>
                        {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>}
                        {preview && (
                            <div className="pt-4 border-t border-zinc-900">
                                <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-600 mb-4 text-center underline underline-offset-4">Reference Preview</p>
                                <div className="relative w-full aspect-square grayscale border border-zinc-900 shadow-2xl">
                                    <Image src={preview} alt="Image preview" fill style={{ objectFit: "cover" }} />
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="pt-8">
                        <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200 rounded-none text-xs uppercase tracking-widest h-14 transition-all">
                            Update Record
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
