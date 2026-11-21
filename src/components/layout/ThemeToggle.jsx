import { useTheme } from '../../hooks/useTheme.js'
import Icon from '../ui/Icon.jsx'

/**
 * Sun/moon button in the navbar.
 * Light mode shows a moon ("switch to dark"); dark mode shows a sun.
 * It is a toggle button: aria-pressed tells screen readers whether dark
 * mode is on, and the accessible name stays the same ("Dark mode").
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={18} />
      <span className="visually-hidden">Dark mode</span>
    </button>
  )
}
