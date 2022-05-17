import { createContext, useEffect, useState } from 'react'

const INITIAL_STATE = {
  dark: localStorage.getItem('theme') || 'false',
}

export const ThemeContext = createContext(INITIAL_STATE)

export const ThemeContextProvider = ({ children }) => {
  const [themeState, setThemeState] = useState(INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('theme', themeState.dark)
  }, [themeState.dark])

  return (
    <ThemeContext.Provider value={[themeState, setThemeState]}>
      {children}
    </ThemeContext.Provider>
  )
}
