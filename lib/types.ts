export interface Product {
    id: number
    name: string
    price: number
    image: string | null
    category: string | null
    description: string | null
    is_available: boolean
    featured?: boolean
}

export interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
    role: string | null
}
