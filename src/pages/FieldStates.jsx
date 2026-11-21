import './FieldStates.css'

/**
 * Form field states, as a component set: the one text input from the product
 * forms in each of its six states. It uses the real .field / .input classes,
 * so it always matches the live forms in both light and dark mode.
 *
 * "Focus" is shown with the .is-focus class (a static copy of :focus).
 * Open it at /components/form-fields.
 */
const STATES = [
  { key: 'default', title: 'Default', note: 'Empty, waiting for input' },
  { key: 'focus', title: 'Focus', note: 'Indigo border and soft ring' },
  { key: 'filled', title: 'Filled', note: 'Value entered' },
  { key: 'error', title: 'Error', note: 'Red border, message below' },
  { key: 'disabled', title: 'Disabled', note: 'While saving, or after adding' },
  { key: 'readonly', title: 'Read-only', note: 'SKU on the Edit page' },
]

function FieldExample({ state }) {
  const id = `state-${state}`
  if (state === 'readonly') {
    return (
      <div className="field">
        <label htmlFor={id} className="field__label">
          SKU · read-only
        </label>
        <input id={id} type="text" className="input" defaultValue="SA-EL-001" readOnly />
      </div>
    )
  }

  const error = state === 'error'
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        Product name <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        type="text"
        className={`input ${state === 'focus' ? 'is-focus' : ''}`.trim()}
        placeholder="Enter product name"
        defaultValue={state === 'filled' || state === 'disabled' ? 'Studio headphones' : ''}
        disabled={state === 'disabled'}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="field__error">
          Enter a product name.
        </p>
      )}
    </div>
  )
}

export default function FieldStates() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Components</p>
        <h1 className="page-title field-states__heading">Form field states</h1>
        <p className="page-subtitle">One input, every state. Toggle the theme to see both modes.</p>

        <ul className="field-states">
          {STATES.map((state) => (
            <li key={state.key} className="field-states__item">
              <div className="field-states__meta">
                <h2 className="field-states__title">{state.title}</h2>
                <p className="field-states__note">{state.note}</p>
              </div>
              <FieldExample state={state.key} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
