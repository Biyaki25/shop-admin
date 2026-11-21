import { useEffect, useState } from 'react'

export const THEME_KEY = 'shopadmin.theme'

const media = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null)

function readSaved() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null // storage blocked (private mode etc.): just don't remember
  }
}

/**
 * Current colour mode ('light' | 'dark') and a toggle.
 *
 * The starting value is whatever the inline script in index.html already put
 * on <html data-theme>. Toggling saves the choice; until the user chooses,
 * the app follows the operating-system setting, live.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  // Keep the <html> attribute in sync: this is what switches the token mode.
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Follow OS changes only while the user hasn't picked a mode themselves.
  useEffect(() => {
    const query = media()
    if (!query) return
    const onChange = (event) => {
      if (!readSaved()) setTheme(event.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // ignore: the mode still switches for this visit
    }
    setTheme(next)
  }

  return { theme, toggleTheme }
}
