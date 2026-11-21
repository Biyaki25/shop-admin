import Icon from './Icon.jsx'
import './Toast.css'

/**
 * Self-dismissing success toast, e.g. "Studio headphones deleted. Undo".
 *
 * A thin bar along the bottom shrinks over `duration` ms to show how long is
 * left. The countdown is the CSS animation itself: when it ends, onDismiss
 * fires, so the bar and the timer can never drift apart. Hovering or focusing
 * the toast pauses it (WCAG 2.2.1: people need time to reach "Undo").
 */
export default function Toast({ children, action, duration = 5000, onDismiss }) {
  return (
    <div className="toast" role="status">
      <div className="toast__body">
        <Icon name="check" size={16} strokeWidth={2.5} className="toast__icon" />
        <span className="toast__text">{children}</span>
        {action}
      </div>
      <div
        className="toast__progress"
        style={{ '--toast-duration': `${duration}ms` }}
        onAnimationEnd={onDismiss}
        aria-hidden="true"
      />
    </div>
  )
}
