"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import RestaurantCard from "./RestaurantCard"
import { X, Heart, Star } from "lucide-react"
import type { Restaurant } from "../types/restaurant"
import { useLikedRestaurantsContext } from "../context/LikedRestaurantsContext"
import { useRestaurants } from "../hooks/useRestaurants"

interface RestaurantSwiperProps {
  initialRestaurant?: Restaurant | null
  setActiveTab: (tab: string) => void
}

export default function RestaurantSwiper({ initialRestaurant, setActiveTab }: RestaurantSwiperProps) {
  const { restaurants, loading, error } = useRestaurants({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { addLikedRestaurant } = useLikedRestaurantsContext()
  const [savedRestaurants, setSavedRestaurants] = useState<Set<string>>(new Set())

  // Display loading state
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent" />
        <p className="text-gray-600">Finding restaurants near you...</p>
      </div>
    )
  }

  // Display error state
  if (error) {
    const handleAdjustPreferences = () => {
      setActiveTab("profile")
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={handleAdjustPreferences}
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Adjust Preferences
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Display message when no restaurants are found
  if (restaurants.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 text-center">
        <div className="bg-yellow-50 p-6 rounded-lg max-w-md">
          <p className="text-yellow-600 mb-4">
            No restaurants found matching your preferences. Try adjusting your filters or increasing the search radius.
          </p>
          <button
            onClick={() => setActiveTab("profile")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Adjust Preferences
          </button>
        </div>
      </div>
    )
  }

  // Handle swiping action
  const handleSwipe = (swipeDirection: "left" | "right") => {
    setDirection(swipeDirection)
    if (swipeDirection === "right") {
      addLikedRestaurant(restaurants[currentIndex])
      setTimeout(() => {
        setActiveTab("chat")
      }, 300)
    }

    const swipeAnimation = {
      x: swipeDirection === "left" ? -300 : 300,
      opacity: 0,
    }

    if (cardRef.current) {
      cardRef.current.animate([
        { transform: 'translateX(0)', opacity: 1 },
        { transform: `translateX(${swipeAnimation.x}px)`, opacity: 0 }
      ], {
        duration: 300,
        easing: 'ease-out'
      })
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length)
      setDirection(null)
    }, 300)
  }

  // Handle drag end event
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -100) handleSwipe("left")
    else if (info.offset.x > 100) handleSwipe("right")
  }

  return (
    <div className="w-full h-full flex flex-col justify-between pb-20">
      <div className="relative flex-1 w-full max-w-sm mx-auto">
        <AnimatePresence>
          <motion.div
            ref={cardRef}
            key={restaurants[currentIndex].id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{
              scale: 0.8,
              opacity: 0,
              x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <RestaurantCard restaurant={restaurants[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-4 space-x-4 mb-4">
        <button
          className="bg-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-xl active:shadow-md"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-8 h-8 text-red-500" />
        </button>
        <button
          className="bg-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-xl active:shadow-md"
          onClick={() => {
            addLikedRestaurant(restaurants[currentIndex])
            setSavedRestaurants((prev) => new Set([...prev, restaurants[currentIndex].id]))
            setTimeout(() => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurants.length)
            }, 300)
          }}
        >
          <Star
            className={`w-8 h-8 ${
              savedRestaurants.has(restaurants[currentIndex].id) ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"
            }`}
          />
        </button>
        <button
          className="bg-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-xl active:shadow-md"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  )
}

