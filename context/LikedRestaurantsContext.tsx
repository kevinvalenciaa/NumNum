"use client"

import { createContext, useContext } from "react"
import { useLikedRestaurants } from "../hooks/useLikedRestaurants"
import type { Restaurant } from "../types/restaurant"

interface LikedRestaurantsContextType {
  likedRestaurants: Restaurant[]
  addLikedRestaurant: (restaurant: Restaurant) => void
  removeLikedRestaurant: (id: string) => void // Ensure this is properly typed
}

const LikedRestaurantsContext = createContext<LikedRestaurantsContextType | undefined>(undefined)

export function LikedRestaurantsProvider({ children }: { children: React.ReactNode }) {
  const { likedRestaurants, addLikedRestaurant, removeLikedRestaurant } = useLikedRestaurants()

  return (
    <LikedRestaurantsContext.Provider value={{ likedRestaurants, addLikedRestaurant, removeLikedRestaurant }}>
      {children}
    </LikedRestaurantsContext.Provider>
  )
}

export function useLikedRestaurantsContext() {
  const context = useContext(LikedRestaurantsContext)
  if (context === undefined) {
    throw new Error("useLikedRestaurantsContext must be used within a LikedRestaurantsProvider")
  }
  return context
}

