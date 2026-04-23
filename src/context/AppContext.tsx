import { createContext, useContext, useState } from 'react'

export interface FavoritedDomain {
  id: string
  name: string
  tld: string
  originalPrice: number
  salePrice: number | null
}

interface AppContextValue {
  isLoggedIn: boolean
  userName: string | null
  login: () => void
  logout: () => void
  favorites: Map<string, FavoritedDomain>
  addFavorite: (d: FavoritedDomain) => void
  removeFavorite: (id: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Map<string, FavoritedDomain>>(new Map())

  function login() {
    setIsLoggedIn(true)
    setUserName('Lee Borden')
  }

  function logout() {
    setIsLoggedIn(false)
    setUserName(null)
    setFavorites(new Map())
  }

  function addFavorite(d: FavoritedDomain) {
    setFavorites((prev) => new Map(prev).set(d.id, d))
  }

  function removeFavorite(id: string) {
    setFavorites((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, userName, login, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
