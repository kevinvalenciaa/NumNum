"use client"

import type { Restaurant } from "../types/restaurant"
import { X, Star, MapPin, Clock, ChevronLeft, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface LikedRestaurantsModalProps {
  isOpen: boolean
  onClose: () => void
  restaurants?: Restaurant[]
  removeLikedRestaurant: (id: string) => void
}

export default function LikedRestaurantsModal({
  isOpen,
  onClose,
  restaurants = [],
  removeLikedRestaurant,
}: LikedRestaurantsModalProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            {selectedRestaurant && (
              <button onClick={() => setSelectedRestaurant(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h2 className="text-xl font-bold">{selectedRestaurant ? selectedRestaurant.name : "Liked Restaurants"}</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedRestaurant && (
              <button
                onClick={() => {
                  removeLikedRestaurant(selectedRestaurant.id)
                  setSelectedRestaurant(null)
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
          {selectedRestaurant ? (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedRestaurant.image || "/placeholder.svg"}
                  alt={selectedRestaurant.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">{selectedRestaurant.rating}</span>
                    </div>
                    <div className="text-gray-600">{selectedRestaurant.priceRange}</div>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedRestaurant.distance} miles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span className={selectedRestaurant.isOpen ? "text-green-600" : "text-red-600"}>
                        {selectedRestaurant.isOpen ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${selectedRestaurant.location.lat},${selectedRestaurant.location.lng}&zoom=15&size=400x400&markers=color:yellow%7C${selectedRestaurant.location.lat},${selectedRestaurant.location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
                    alt={`Map location for ${selectedRestaurant.name}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reviews</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {selectedRestaurant.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{review.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-400">
                          {review.rating} - {review.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="relative cursor-pointer transform transition-transform hover:scale-105 group"
                >
                  <div
                    className="relative aspect-square rounded-lg overflow-hidden shadow-md"
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeLikedRestaurant(restaurant.id)
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-opacity-75"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <h3 className="text-white font-semibold text-sm">{restaurant.name}</h3>
                        <p className="text-white text-opacity-80 text-xs">{restaurant.cuisine}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

