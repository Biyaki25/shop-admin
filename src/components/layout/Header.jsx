import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './Header.css'

/** Navigation items. `match` decides which link is highlighted for a URL. */
const NAV_ITEMS = [
  { to: '/', label: 'Home', match: (path) => path === '/' },
  {
    to: '/products',
    label: 'Products',
    // Products stays active on product details and edit pages, but not on "Add Product".
    match: (path) => path.startsWith('/products') && path !== '/products/new',
  },
  { to: '/products/new', label: 'Add Product', match: (path) => path === '/products/new' },
]

/**
 * Shared site header: logo, main navigation, the "Store admin" label and
 * the light/dark mode toggle.
 * On phones the nav collapses behind a menu button; from 768px up it is
 * shown inline, centered, exactly as in the mock-up.
 */
export default function Header() {
  const { pathname } = useLocation()
  // Remember which page the menu was opened on, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState(null)
  const menuOpen = openOnPath === pathname

  const closeMenu = () => setOpenOnPath(null)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Icon name="logo" size={18} strokeWidth={2.25} />
          <span>ShopAdmin</span>
        </Link>

        <nav
          id="site-nav"
          className={`site-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Main"
          onKeyDown={(event) => event.key === 'Escape' && closeMenu()}
        >
          <ul className="site-nav__list">
            {NAV_ITEMS.map((item) => {
              const active = item.match(pathname)
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`site-nav__link ${active ? 'is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="site-header__role">Store admin</p>
        </nav>

        {/* Always visible: the theme toggle, plus the menu button on phones. */}
        <div className="site-header__actions">
          <ThemeToggle />
          <button
            type="button"
            className="site-header__menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setOpenOnPath(menuOpen ? null : pathname)}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
