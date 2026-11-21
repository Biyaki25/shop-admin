import Icon from '../ui/Icon.jsx'
import './UnsavedChangesBar.css'

/**
 * Bar that sticks to the bottom of the screen while the Edit form has
 * unsaved edits: "You have unsaved changes" with Discard and Save changes.
 *
 * The Save button submits the edit form through the `form` attribute, so the
 * bar can live outside the <form> element and still use its validation.
 */
export default function UnsavedChangesBar({ formId, saving, onDiscard }) {
  return (
    <div className="unsaved-bar" role="region" aria-label="Unsaved changes">
      <div className="container unsaved-bar__inner">
        <p className="unsaved-bar__message" role="status">
          <span className="field__changed-dot unsaved-bar__dot" aria-hidden="true" />
          You have unsaved changes
        </p>
        <div className="unsaved-bar__actions">
          <button type="button" className="btn btn--secondary" onClick={onDiscard} disabled={saving}>
            Discard
          </button>
          <button
            type="submit"
            form={formId}
            className={`btn btn--primary ${saving ? 'is-busy' : ''}`}
            disabled={saving}
          >
            {saving && <Icon name="spinner" size={16} />}
            Save changes
            {saving && <span className="visually-hidden"> (saving…)</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
