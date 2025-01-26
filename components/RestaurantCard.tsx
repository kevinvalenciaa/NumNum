import Image from "next/image"
import type { Restaurant } from "../types/restaurant"
import { Star, MapPin, Clock, Globe } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

interface Review {
  id: string
  text: string
  rating: number
  source: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

interface Restaurant {
  image?: string
  name: string
  cuisine: string
  rating: number
  priceRange: string
  distance: number
  isOpen: boolean
  reviews: Review[]
  website: string
}

const variants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [showReviews, setShowReviews] = useState(false)
  const [dragY, setDragY] = useState(0)
  return (
    <motion.div
      className="relative w-full h-full rounded-xl overflow-hidden shadow-xl"
      onPanEnd={(e, info) => {
        if (info.offset.y < -50 && !showReviews) {
          setShowReviews(true)
        }
      }}
    >
      <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="absolute top-4 right-4">
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-5 h-5 text-white" />
            </a>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h2>
          <p className="text-white text-opacity-80 mb-2">{restaurant.cuisine}</p>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-1" />
              <span className="text-white">{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <span className="text-white">{restaurant.priceRange}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-white mr-1" />
              <span className="text-white">{restaurant.distance} miles</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-white mr-1" />
              <span className={`text-white ${restaurant.isOpen ? "text-green-500" : "text-red-500"}`}>
                {restaurant.isOpen ? "Open Now" : "Closed"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-y-auto"
        variants={variants}
        initial="hidden"
        animate={showReviews ? "visible" : "hidden"}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDrag={(e, info) => {
          setDragY(info.point.y)
        }}
        onDragEnd={(e, info) => {
          if (info.offset.y > 50) {
            setShowReviews(false)
          }
        }}
        style={{ y: showReviews ? 0 : dragY }}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Reviews</h3>
          {restaurant.reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-2">
              <p className="text-sm">{review.text}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-xs text-gray-600">
                  {review.rating} - {review.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

