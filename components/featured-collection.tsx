import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturedCollection() {
  return (
    <section className="bg-black py-24 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] text-white mb-16 text-center">Featured Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative aspect-[3/4] overflow-hidden group">
            <Image
              src="/images/products/zone-crop-top-red.jpeg"
              alt="Zone Crop Top"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-center items-center">
              <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">Crop Tops</h3>
              <Link href="/shop?category=tops">
                <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black">Explore</Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden group">
            <Image
              src="/images/products/zone-shield-tshirt.jpeg"
              alt="Zone Shield T-Shirt"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-center items-center">
              <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">Shield Series</h3>
              <Link href="/shop">
                <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black">Explore</Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden group">
            <Image
              src="/images/products/mdma-tshirts.jpeg"
              alt="MDMA T-Shirts"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-center items-center">
              <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">MDMA Edition</h3>
              <Link href="/shop">
                <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black">Explore</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
