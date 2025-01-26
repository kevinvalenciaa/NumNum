// Define the structure for restaurant types
export interface RestaurantType {
  primary: string // The main category (e.g., "restaurant", "cafe", "bar")
  cuisines: string[] // Specific cuisine types (e.g., "Italian", "Japanese")
  attributes: string[] // Additional attributes (e.g., "meal_takeaway", "fine_dining")
}

// Define the structure for restaurant reviews
export interface Review {
  id: string
  text: string
  rating: number
  source: string
}

// Define the main Restaurant interface
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
  location: {
    lat: number
    lng: number
  }
  types: RestaurantType
}

