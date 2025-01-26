export interface GooglePlacesResponse {
  status: string
  error_message?: string
  results: GooglePlace[]
  next_page_token?: string
}

export interface GooglePlace {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  price_level?: number
  vicinity: string
  photos?: GooglePhoto[]
  opening_hours?: {
    open_now: boolean
  }
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  types: string[]
}

export interface GooglePhoto {
  photo_reference: string
  height: number
  width: number
}

