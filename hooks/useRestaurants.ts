import { useState, useEffect } from "react"
import { useLocation } from "./useLocation"
import { usePreferences } from "../context/PreferencesContext"
import { calculateDistance } from "../utils/distance"
import type { Restaurant } from "../types/restaurant"

interface UseRestaurantsProps {
  manualLat?: number
  manualLng?: number
}

export function useRestaurants({ manualLat, manualLng }: UseRestaurantsProps = {}) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation({ manualLat, manualLng })
  const { preferences } = usePreferences()

  useEffect(() => {
    // Only proceed if we have location or an error
    if (location.loading) return

    const fetchRestaurants = async () => {
      try {
        // If we have a location error, propagate it
        if (location.error) {
          setError(location.error)
          setLoading(false)
          return
        }

        // Ensure we have location before proceeding
        if (!location.latitude || !location.longitude) {
          setError("Location is required to find restaurants")
          setLoading(false)
          return
        }

        const params = new URLSearchParams({
          lat: location.latitude.toString(),
          lng: location.longitude.toString(),
          radius: preferences.maxDistance.toString(),
          maxPrice: preferences.priceRange.toString(),
        })

        if (preferences.selectedCuisines.length > 0) {
          params.append("cuisineTypes", preferences.selectedCuisines.join(","))
        }

        const response = await fetch(`/api/restaurants?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants")
        }

        const data = await response.json()
        console.log("API Response:", data)

        if (data.error) {
          throw new Error(data.error)
        }

        // Calculate distances and filter based on preferences
        const restaurantsWithDistance = data.restaurants.map((restaurant: Restaurant) => ({
          ...restaurant,
          distance: calculateDistance(
            location.latitude!,
            location.longitude!,
            restaurant.location.lat,
            restaurant.location.lng,
          ),
        }))

        // Filter restaurants based on preferences
        const filteredRestaurants = restaurantsWithDistance.filter((restaurant: Restaurant) => {
          // Only filter by distance
          return restaurant.distance <= preferences.maxDistance;
        })

        setRestaurants(filteredRestaurants)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching restaurants")
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [location, preferences])

  return { restaurants, loading, error }
}

