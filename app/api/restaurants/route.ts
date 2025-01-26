import { NextResponse } from "next/server"
import type { GooglePlacesResponse, GooglePlace } from "@/types/google-places"
import type { RestaurantType } from "../../../types/restaurant"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

// Helper function to categorize restaurant types
function categorizeTypes(types: string[]): RestaurantType {
  const primaryTypes = new Set(["restaurant", "cafe", "bar", "bakery"])
  const cuisineTypes = new Set([
    "italian",
    "french",
    "mexican",
    "chinese",
    "japanese",
    "indian",
    "american",
    "pizza",
    "seafood",
    "sushi",
    "vegetarian",
    "vegan",
  ])

  return {
    primary: types.find((type) => primaryTypes.has(type)) || "restaurant",
    cuisines: types.filter((type) => cuisineTypes.has(type)),
    attributes: types.filter(
      (type) =>
        !primaryTypes.has(type) && !cuisineTypes.has(type) && type !== "point_of_interest" && type !== "establishment",
    ),
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const radius = searchParams.get("radius") // in kilometers
  const cuisineTypes = searchParams.get("cuisineTypes")?.split(",")
  const maxPrice = searchParams.get("maxPrice")

  if (!lat || !lng || !radius) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    const radiusInMeters = Math.round(Number(radius) * 1000) // Convert kilometers to meters

    const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    const params = new URLSearchParams({
      location: `${lat},${lng}`,
      radius: radiusInMeters.toString(),
      type: "restaurant",
      keyword: cuisineTypes?.length ? cuisineTypes.join("|") : "",
      key: GOOGLE_PLACES_API_KEY!,
    })

    if (maxPrice) {
      params.append("maxprice", maxPrice)
    }

    const response = await fetch(`${baseUrl}?${params.toString()}`)
    const data: GooglePlacesResponse = await response.json()
    console.log("Google Places API URL:", `${baseUrl}?${params.toString()}`)
    console.log("Google Places API Response:", data)
    console.log("API Key being used:", GOOGLE_PLACES_API_KEY)

    if (data.status !== "OK") {
      return NextResponse.json({ 
        error: `Google Places API Error: ${data.status}${data.error_message ? ` - ${data.error_message}` : ''}` 
      }, { status: 500 })
    }

    // Transform the response to match our Restaurant type
    const restaurants = data.results.map((place: GooglePlace) => ({
      id: place.place_id,
      name: place.name,
      cuisine: place.types.find((type) => type !== "restaurant" && type !== "food") || "Restaurant",
      rating: place.rating || 0,
      priceRange: "".padStart(place.price_level || 0, "$"),
      distance: 0, // Will be calculated on the client side
      isOpen: place.opening_hours?.open_now ?? false,
      image: place.photos?.[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
        : "/placeholder.svg",
      website: "", // Will be fetched with place details
      reviews: [], // Will be fetched with place details
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      types: categorizeTypes(place.types),
    }))

    return NextResponse.json({ restaurants })
  } catch (error) {
    console.error("Error fetching restaurants:", error)
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 })
  }
}

