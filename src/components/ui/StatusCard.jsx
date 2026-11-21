import Icon from './Icon.jsx'
import './StatusCard.css'

/**
 * Big centered white card for whole-page states from states.pdf:
 * "No products found", "Couldn't load products", "Product not found",
 * "Page not found".
 *
 * - icon: 'search' | 'alert' | 'box', or `badge` text like "404"
 * - tone: 'brand' (indigo) or 'danger' (red) for the icon circle
 */
export default function StatusCard({ icon, badge, tone = 'brand', title, headingLevel = 2, children, action, compact = false }) {
  const Heading = `h${headingLevel}`
  return (
    <section className={`status-card ${compact ? 'status-card--compact' : ''}`.trim()} aria-live="polite">
      {badge ? (
        <span className="status-card__badge">{badge}</span>
      ) : (
        icon && (
          <span className={`status-card__icon status-card__icon--${tone}`}>
            {icon === 'alert' ? <span aria-hidden="true">!</span> : <Icon name={icon} size={16} />}
          </span>
        )
      )}
      <Heading className="status-card__title">{title}</Heading>
      {children && <div className="status-card__text">{children}</div>}
      {action && <div className="status-card__action">{action}</div>}
    </section>
  )
}
