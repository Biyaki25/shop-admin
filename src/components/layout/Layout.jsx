import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import './Layout.css'

/**
 * Page shell used by every route: skip link, shared header, the routed page
 * (<Outlet />) and the shared footer.
 */
export default function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top, like a normal multi-page site.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="app-shell__main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer showTagline={pathname === '/'} />
    </div>
  )
}
