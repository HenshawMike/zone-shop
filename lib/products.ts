import type { Product } from "./types"

/**
 * ONLY real products with real photos.
 * Feel free to extend this list as you add more images.
 */
export const products: Product[] = [
  {
    id: 1,
    name: "Zone Crop Top – Red Edition",
    price: 7500,
    image: "/images/products/zone-crop-top-red.jpeg",
    category: "tops",
    description: "Our signature Zone crop top in bold red. Perfect for making a statement at parties and events.",
    is_available: true,
  },
  {
    id: 2,
    name: "MDMA Streetwear T-Shirt",
    price: 8000,
    image: "/images/products/mdma-tshirts.jpeg",
    category: "t-shirts",
    description: "Bold graphic t-shirt with MDMA print. Ideal for turning heads on Abuja's streets.",
    is_available: true,
  },
  {
    id: 3,
    name: "Zone Tube Top – Limited Edition",
    price: 6500,
    image: "/images/products/zone-crop-top-red2.jpeg",
    category: "tops",
    description: "Limited-edition Zone tube top with our iconic logo. Perfect for nights out.",
    is_available: true,
  },
  {
    id: 4,
    name: "Zone Shield T-Shirt",
    price: 9000,
    image: "/images/products/zone-shield-tshirt.jpeg",
    category: "t-shirts",
    description: "Edgy black tee featuring the exclusive Zone shield design with red accents.",
    is_available: true,
  },
  {
    id: 5,
    name: "MDMA Striped T-Shirt",
    price: 8500,
    image: "/images/products/mdma-striped-tshirt.jpeg",
    category: "t-shirts",
    description: "Black tee with striking red & white MDMA stripes – the urban rebel's staple.",
    is_available: true,
  },
  {
    id: 6,
    name: "6IXSOLDIERS Camo Jersey",
    price: 30000,
    image: "/images/products/6ixsoldiers-camo-jersey.jpeg",
    category: "jerseys",
    description: "Limited edition camo jersey featuring the exclusive 6IXSOLDIERS design.",
    is_available: true,
  },
  {
    id: 7,
    name: "6IXSOLDIERS Members Only Shorts",
    price: 35000,
    image: "/images/products/6ixsoldiers-members-only-shorts.jpeg",
    category: "shorts",
    description: "Exclusive members-only shorts with premium fabric and comfortable fit.",
    is_available: true,
  },
  {
    id: 8,
    name: "Zone Mules",
    price: 80000,
    image: "/images/products/zone-Mules.jpeg",
    category: "footwear",
    description: "Stylish and comfortable mules featuring the Zone logo.",
    is_available: true,
  },
  {
    id: 9,
    name: "Convertible Zone Tube Top",
    price: 25000,
    image: "/images/products/convertible-zone-tube-top.jpeg",
    category: "tops",
    description: "Versatile convertible tube top that can be styled in multiple ways.",
    is_available: true,
  }
]
