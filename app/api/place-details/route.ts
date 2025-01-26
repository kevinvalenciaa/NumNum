import { NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const placeId = searchParams.get("placeId")

  if (!placeId) {
    return NextResponse.json({ error: "Missing place ID" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=price_level,types,rating,user_ratings_total,reviews,website,opening_hours&key=${GOOGLE_PLACES_API_KEY}`,
    )
    const data = await response.json()

    if (data.status !== "OK") {
      throw new Error(`Google Places API Error: ${data.status}`)
    }

    return NextResponse.json({
      details: {
        priceLevel: data.result.price_level,
        types: data.result.types,
        rating: data.result.rating,
        userRatingsTotal: data.result.user_ratings_total,
        reviews: data.result.reviews,
        website: data.result.website,
        openingHours: data.result.opening_hours,
      },
    })
  } catch (error) {
    console.error("Error fetching place details:", error)
    return NextResponse.json({ error: "Failed to fetch place details" }, { status: 500 })
  }
}

