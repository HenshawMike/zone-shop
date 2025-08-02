import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturedCollection() {
  return (
    <section className="bg-zinc-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-8 text-center">Our Collection</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg group">
            <Image
              src="/images/products/zone-crop-top-red.jpeg"
              alt="Zone Crop Top"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Zone Crop Tops</h3>
              <p className="text-zinc-300 mb-4">Make a statement with our signature crop tops</p>
              <Link href="/shop?category=tops">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Shop Now</Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-lg group">
            <Image
              src="/images/products/zone-shield-tshirt.jpeg"
              alt="Zone Shield T-Shirt"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Zone Shield Collection</h3>
              <p className="text-zinc-300 mb-4">Edgy designs for the urban explorer</p>
              <Link href="/shop">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Shop Now</Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-lg group">
            <Image
              src="/images/products/mdma-tshirts.jpeg"
              alt="MDMA T-Shirts"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">MDMA Collection</h3>
              <p className="text-zinc-300 mb-4">Bold designs for those who lead, not follow</p>
              <Link href="/shop">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
