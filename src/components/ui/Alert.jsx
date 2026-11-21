import { forwardRef } from 'react'
import Icon from './Icon.jsx'
import './Alert.css'

/**
 * Inline banner used for "Product saved successfully.", "Please check the 4
 * highlighted fields." and the "deleted · Undo" toast.
 *
 * - variant: 'success' (green, announced politely) or 'error' (red, announced
 *   immediately via role="alert").
 * - action: optional element shown on the right (e.g. the Undo button).
 * It forwards a ref so pages can move focus to it after a submit.
 */
const Alert = forwardRef(function Alert({ variant = 'success', action, className = '', children }, ref) {
  const isError = variant === 'error'
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={isError ? 'alert' : 'status'}
      className={`alert alert--${variant} ${className}`.trim()}
    >
      {isError ? (
        <span className="alert__bang" aria-hidden="true">
          !
        </span>
      ) : (
        <Icon name="check" size={16} strokeWidth={2.5} className="alert__icon" />
      )}
      <span className="alert__text">{children}</span>
      {action && <span className="alert__action">{action}</span>}
    </div>
  )
})

export default Alert
