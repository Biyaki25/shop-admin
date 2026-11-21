import './Footer.css'

/**
 * Shared site footer. The landing page version adds a tagline row
 * ("One workspace. A well-run store.") above the copyright line.
 */
export default function Footer({ showTagline = false }) {
  return (
    <footer className={`site-footer ${showTagline ? 'site-footer--landing' : ''}`.trim()}>
      <div className="container">
        {showTagline && (
          <div className="site-footer__row site-footer__row--tagline">
            <p className="site-footer__lead">One workspace. A well-run store.</p>
            <p>Simple tools. Thoughtful details. Built around your day.</p>
          </div>
        )}
        <div className="site-footer__row site-footer__bar">
          <p>© 2026 ShopAdmin. All rights reserved.</p>
          <p>Made for better store management</p>
          <p>Developed by Daniel Evans and Elvin</p>
        </div>
      </div>
    </footer>
  )
}
