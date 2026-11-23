import { Link, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import './Sidebar.css'

/**
 * Navigation, grouped into sections like an admin dashboard sidebar.
 * `match` decides which link is highlighted for a URL.
 */
const NAV_SECTIONS = [
  {
    title: null,
    items: [{ to: '/', label: 'Dashboard', icon: 'grid', match: (path) => path === '/' }],
  },
  {
    title: 'Catalog',
    items: [
      {
        to: '/products',
        label: 'Products',
        icon: 'box',
        // Products stays active on product details and edit pages, but not on "Add Product".
        match: (path) => path.startsWith('/products') && path !== '/products/new',
      },
      {
        to: '/products/new',
        label: 'Add Product',
        icon: 'square-plus',
        match: (path) => path === '/products/new',
      },
    ],
  },
  {
    title: 'UI elements',
    items: [
      { to: '/components/buttons', label: 'Buttons', icon: 'layers', match: (path) => path === '/components/buttons' },
      {
        to: '/components/form-fields',
        label: 'Form fields',
        icon: 'form',
        match: (path) => path === '/components/form-fields',
      },
    ],
  },
]

/**
 * Left sidebar. Always visible from 1024px up; below that it is an
 * off-canvas drawer opened from the top bar's menu button.
 */
export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation()

  return (
    <>
      <aside
        id="sidebar"
        className={`sidebar ${open ? 'is-open' : ''}`.trim()}
        onKeyDown={(event) => event.key === 'Escape' && onClose()}
      >
        <div className="sidebar__brand-row">
          <Link to="/" className="brand" onClick={onClose}>
            <Icon name="logo" size={18} strokeWidth={2.25} />
            <span>ShopAdmin</span>
          </Link>
          <button type="button" className="sidebar__close" onClick={onClose}>
            <Icon name="x" size={20} />
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Main">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title ?? 'main'} className="sidebar__section">
              {section.title && <p className="sidebar__heading">{section.title}</p>}
              <ul className="sidebar__list">
                {section.items.map((item) => {
                  const active = item.match(pathname)
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`sidebar__link ${active ? 'is-active' : ''}`.trim()}
                        aria-current={active ? 'page' : undefined}
                        onClick={onClose}
                      >
                        <Icon name={item.icon} size={18} />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Dimmed page behind the drawer on small screens; click to close. */}
      <div className={`sidebar-backdrop ${open ? 'is-open' : ''}`.trim()} aria-hidden="true" onClick={onClose} />
    </>
  )
}
