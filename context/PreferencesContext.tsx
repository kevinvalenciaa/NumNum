"use client"

import { createContext, useContext } from "react"
import { useUserPreferences, type UserPreferences } from "../hooks/useUserPreferences"

interface PreferencesContextType {
  preferences: UserPreferences
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void
  isLoading: boolean
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const { preferences, updatePreferences, isLoading } = useUserPreferences()

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, isLoading }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider")
  }
  return context
}

