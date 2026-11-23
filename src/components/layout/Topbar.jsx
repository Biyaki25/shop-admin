import Icon from '../ui/Icon.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './Topbar.css'

function greeting(hour) {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

/**
 * Sticky top bar of the dashboard: menu button (below 1024px), a greeting,
 * the theme toggle and the signed-in admin's avatar.
 */
export default function Topbar({ menuOpen, onMenuClick }) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__menu-button"
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        onClick={onMenuClick}
      >
        <Icon name="menu" size={22} />
        <span className="visually-hidden">Open menu</span>
      </button>

      <div className="topbar__greeting">
        <p className="topbar__hello">
          <span className="topbar__time">{greeting(new Date().getHours())}, </span>
          <strong>Store admin</strong>
        </p>
        <p className="topbar__sub">Here’s what’s happening in your store.</p>
      </div>

      <div className="topbar__actions">
        <ThemeToggle />
        <span className="topbar__avatar" aria-hidden="true">
          SA
        </span>
      </div>
    </header>
  )
}
