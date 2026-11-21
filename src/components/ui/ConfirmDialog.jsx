import { useEffect, useId, useRef } from 'react'
import Icon from './Icon.jsx'
import './ConfirmDialog.css'

/**
 * Confirmation dialog: "Delete this product?" and "Leave without saving?".
 *
 * The safe choice (cancelLabel: "Cancel" / "Keep editing") is always the
 * primary button and gets focus. confirmVariant styles the other button:
 * 'danger' (red outline, for delete) or 'secondary' (for "Leave page").
 *
 * Built on the native <dialog> element, which gives us a focus trap, a dimmed
 * backdrop and Escape-to-close for free. Focus starts on Cancel (the safe
 * choice, styled as the primary button in the mock-up) and returns to the
 * button that opened the dialog when it closes.
 */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  busy = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)
  const titleId = useId()
  const descId = useId()

  // Open/close the native dialog when the `open` prop changes.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return
    const opener = document.activeElement
    // Fallback to the plain `open` attribute where showModal() isn't supported.
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    }
    cancelRef.current?.focus()
    return () => {
      // Close first: the page behind a modal dialog can't take focus.
      if (typeof dialog.close === 'function') dialog.close()
      dialog.removeAttribute('open')
      opener?.focus?.()
    }
  }, [open])

  // Escape key: let React state drive closing instead of the browser.
  const handleCancelEvent = (event) => {
    event.preventDefault()
    if (!busy) onCancel()
  }

  // Clicking the dimmed backdrop (outside the panel) cancels.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current && !busy) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={handleCancelEvent}
      onClick={handleBackdropClick}
    >
      {open && (
        <div className="dialog__panel">
          <h2 id={titleId} className="dialog__title">
            {title}
          </h2>
          <div id={descId} className="dialog__body">
            {children}
          </div>
          <div className="dialog__actions">
            <button ref={cancelRef} type="button" className="btn btn--primary btn--sm" onClick={onCancel} disabled={busy}>
              {cancelLabel}
            </button>
            <button
              type="button"
              className={`btn ${confirmVariant === 'danger' ? 'btn--danger-outline' : 'btn--secondary'} btn--sm`}
              onClick={onConfirm}
              disabled={busy}
            >
              {busy && <Icon name="spinner" size={14} />}
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
