import { useState, useEffect } from "react"

export interface UserPreferences {
  selectedCuisines: string[]
  selectedDietaryRestrictions: string[]
  priceRange: number
  maxDistance: number
}

const DEFAULT_PREFERENCES: UserPreferences = {
  selectedCuisines: [],
  selectedDietaryRestrictions: [],
  priceRange: 2,
  maxDistance: 10,
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load preferences from localStorage on mount
    const loadPreferences = () => {
      try {
        const savedPreferences = localStorage.getItem("userPreferences")
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences))
        }
      } catch (error) {
        console.error("Error loading preferences:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPreferences()
  }, [])

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPreferences }
      // Save to localStorage
      try {
        localStorage.setItem("userPreferences", JSON.stringify(updated))
      } catch (error) {
        console.error("Error saving preferences:", error)
      }
      return updated
    })
  }

  return {
    preferences,
    updatePreferences,
    isLoading,
  }
}

