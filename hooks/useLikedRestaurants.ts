import { useState, useEffect } from "react"
import type { Restaurant } from "../types/restaurant"

export function useLikedRestaurants() {
  const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    // Load liked restaurants from localStorage on mount
    const savedLikedRestaurants = localStorage.getItem("likedRestaurants")
    if (savedLikedRestaurants) {
      setLikedRestaurants(JSON.parse(savedLikedRestaurants))
    }
  }, [])

  const addLikedRestaurant = (restaurant: Restaurant) => {
    setLikedRestaurants((prev) => {
      // Check if restaurant already exists
      if (prev.some((r) => r.id === restaurant.id)) {
        return prev
      }
      const updated = [...prev, restaurant]
      localStorage.setItem("likedRestaurants", JSON.stringify(updated))
      return updated
    })
  }

  const removeLikedRestaurant = (restaurantId: string) => {
    setLikedRestaurants((prev) => {
      const updated = prev.filter((r) => r.id !== restaurantId)
      localStorage.setItem("likedRestaurants", JSON.stringify(updated))
      return updated
    })
  }

  return {
    likedRestaurants,
    addLikedRestaurant,
    removeLikedRestaurant,
  }
}

