import Image from "next/image"
import type { Restaurant } from "../types/restaurant"
import { Star, MapPin, Clock, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PlaceDetails {
  priceLevel: number
  types: string[]
  rating: number
  userRatingsTotal: number
  reviews: GoogleReview[]
  website: string
  openingHours: {
    open_now: boolean
    periods: any[]
  }
}

interface GoogleReview {
  author_name: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

const variants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [showReviews, setShowReviews] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch place details when reviews are shown
  useEffect(() => {
    if (showReviews && restaurant.id && !placeDetails) {
      setLoading(true)
      fetch(`/api/place-details?placeId=${restaurant.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.details) {
            setPlaceDetails(data.details)
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [showReviews, restaurant.id, placeDetails])

  const getPriceLevel = (level: number) => {
    return "".padStart(level || 0, "$")
  }

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
              href={placeDetails?.website || restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all hover:scale-110 focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-5 h-5 text-white" />
            </a>
          </div>
          <h2 className="text-xl font-bold text-white mb-2 truncate">{restaurant.name}</h2>
          <p className="text-white text-opacity-80 mb-2">
            {restaurant.types.cuisines.length > 0 ? restaurant.types.cuisines.join(", ") : restaurant.types.primary}
          </p>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="text-white">{placeDetails?.rating || restaurant.rating}</span>
              </div>
              {placeDetails?.userRatingsTotal && (
                <span className="text-white text-opacity-75 text-sm">({placeDetails.userRatingsTotal})</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-white">{getPriceLevel(placeDetails?.priceLevel) || restaurant.priceRange}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-white mr-1" />
              <span className="text-white">{restaurant.distance} km</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-white mr-1" />
              <span
                className={`text-white ${
                  placeDetails?.openingHours?.open_now || restaurant.isOpen ? "text-green-500" : "text-red-500"
                }`}
              >
                {placeDetails?.openingHours?.open_now || restaurant.isOpen ? "Open Now" : "Closed"}
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
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent"></div>
            </div>
          ) : placeDetails?.reviews ? (
            <div className="space-y-4">
              {placeDetails.reviews.map((review) => (
                <div key={review.time} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{review.author_name}</span>
                    <span className="text-sm text-gray-500">{review.relative_time_description}</span>
                  </div>
                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews available</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

