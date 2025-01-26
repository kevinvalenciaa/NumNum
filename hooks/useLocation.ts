import { useState, useEffect } from "react"

interface LocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
  loading: boolean
}

interface UseLocationProps {
  manualLat?: number
  manualLng?: number
}

export function useLocation({ manualLat, manualLng }: UseLocationProps = {}) {
  const [location, setLocation] = useState<LocationState>({
    latitude: manualLat || null,
    longitude: manualLng || null,
    error: null,
    loading: !manualLat || !manualLng,
  })

  useEffect(() => {
    if (manualLat && manualLng) {
      setLocation({
        latitude: manualLat,
        longitude: manualLng,
        error: null,
        loading: false,
      })
      return
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            loading: false,
          })
        },
        (error) => {
          // Fall back to Queen's University coordinates if geolocation fails
          setLocation({
            latitude: 44.2253,
            longitude: -76.4951,
            error: null,
            loading: false,
          })
        }
      )
    } else {
      // Fall back to Queen's University coordinates if geolocation is not available
      setLocation({
        latitude: 44.2253,
        longitude: -76.4951,
        error: null,
        loading: false,
      })
    }
  }, [manualLat, manualLng])

  return location
}

