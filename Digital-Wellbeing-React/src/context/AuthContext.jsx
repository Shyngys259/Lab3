import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const TOKEN_KEY = 'digitalWellbeingToken'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(Boolean(token))

  useEffect(() => {
    let active = true
    async function loadUser() {
      if (!token) {
        setUser(null)
        setChecking(false)
        return
      }
      try {
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Session expired.')
        if (active) setUser(data.user)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
        if (active) {
          setToken(null)
          setUser(null)
        }
      } finally {
        if (active) setChecking(false)
      }
    }
    loadUser()
    return () => { active = false }
  }, [token])

  function completeAuth(data) {
    localStorage.setItem(TOKEN_KEY, data.token)
    setToken(data.token)
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({
    token, user, checking, completeAuth, logout
  }), [token, user, checking])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
