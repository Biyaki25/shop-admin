import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import Footer from './Footer.jsx'
import './Layout.css'

/**
 * Admin dashboard shell used by every route: skip link, left sidebar,
 * sticky top bar, the routed page (<Outlet />) and the footer.
 */
export default function Layout() {
  const { pathname } = useLocation()
  // Remember which page the drawer was opened on, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState(null)
  const menuOpen = openOnPath === pathname

  // Start each new page at the top, like a normal multi-page site.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Sidebar open={menuOpen} onClose={() => setOpenOnPath(null)} />
      <div className="app-shell__content">
        <Topbar menuOpen={menuOpen} onMenuClick={() => setOpenOnPath(menuOpen ? null : pathname)} />
        <main id="main" className="app-shell__main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
