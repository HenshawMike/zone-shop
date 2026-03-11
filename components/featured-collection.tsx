import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturedCollection() {
  return (
    <section className="bg-transparent py-24 border-t border-zinc-900/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] text-white mb-16 text-center">New Collection</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Tote Bag */}
          <div className="relative aspect-[3/4] overflow-hidden group">
            <Image
              src="/images/products/tote.jpeg"
              alt="Zone Tote Bag"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-center items-center">
              <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">Tote Bag</h3>
              <Link href="/shop?category=bags">
                <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black">Explore</Button>
              </Link>
            </div>
          </div>

          {/* Zone Bag */}
          <div className="relative aspect-[3/4] overflow-hidden group">
            <Image
              src="/images/products/ZONE_BAG.jpeg"
              alt="Zone Bag"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-center items-center">
              <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">Zone Bag</h3>
              <Link href="/shop?category=bags">
                <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black">Explore</Button>
              </Link>
            </div>
          </div>

          {/* 2 Piece */}
          <div className="relative aspect-[3/4] overflow-hidden group">
            <Image
              src="/images/products/2_piece.jpeg"
              alt="Zone 2 Piece Set"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-center items-center">
              <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">2 Piece Set</h3>
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
