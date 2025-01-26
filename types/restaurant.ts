export interface Review {
  id: string
  text: string
  rating: number
  source: string
}

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  priceRange: string
  distance: number
  isOpen: boolean
  image: string
  website: string
  reviews: Review[]
}

