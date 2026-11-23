import Icon from '../components/ui/Icon.jsx'
import './ButtonStates.css'

/**
 * Button reference sheet, laid out like the StarAdmin "Buttons" page:
 * single colour, rounded, outlined, inverse, icon, sizes and block buttons.
 * It uses the real .btn classes from styles/buttons.css, so it always matches
 * the live app in both light and dark mode.
 * Open it at /components/buttons.
 */
const COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

const label = (color) => color[0].toUpperCase() + color.slice(1)

const ICONS = [
  { color: 'primary', icon: 'plus', name: 'Add' },
  { color: 'dark', icon: 'search', name: 'Search' },
  { color: 'danger', icon: 'x', name: 'Remove' },
  { color: 'info', icon: 'image', name: 'Image' },
  { color: 'success', icon: 'check', name: 'Approve' },
]

function Section({ title, hint, wide, children }) {
  return (
    <section className={`button-sheet__card ${wide ? 'button-sheet__card--wide' : ''}`.trim()}>
      <h2 className="button-sheet__title">{title}</h2>
      <p className="button-sheet__hint">
        Add class <code>{hint}</code>
      </p>
      {children}
    </section>
  )
}

function ColorRow({ modifiers = '' }) {
  return (
    <div className="button-sheet__row">
      {COLORS.map((color) => (
        <button key={color} type="button" className={`btn btn--md btn--${color} ${modifiers}`.trim()}>
          {label(color)}
        </button>
      ))}
      {/* Link stays plain in every row, as in the reference sheet. */}
      <button type="button" className={`btn btn--md btn--link ${modifiers.includes('rounded') ? modifiers : ''}`.trim()}>
        Link
      </button>
    </div>
  )
}

export default function ButtonStates() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Components</p>
        <h1 className="page-title button-sheet__heading">Buttons</h1>
        <p className="page-subtitle">Every colour, style, shape and size. Toggle the theme to see both modes.</p>

        <div className="button-sheet">
          <Section title="Single colour buttons" hint=".btn--{color}">
            <ColorRow />
          </Section>

          <Section title="Rounded buttons" hint=".btn--rounded">
            <ColorRow modifiers="btn--rounded" />
          </Section>

          <Section title="Outlined buttons" hint=".btn--outline">
            <ColorRow modifiers="btn--outline" />
          </Section>

          <Section title="Inverse buttons" hint=".btn--inverse">
            <ColorRow modifiers="btn--inverse" />
          </Section>

          <Section title="Icon buttons" hint=".btn--icon">
            <div className="button-sheet__row">
              {ICONS.map(({ color, icon, name }) => (
                <button
                  key={icon}
                  type="button"
                  className={`btn btn--icon btn--rounded btn--${color}`}
                  aria-label={name}
                >
                  <Icon name={icon} size={18} />
                </button>
              ))}
            </div>
            <div className="button-sheet__row">
              {ICONS.map(({ color, icon, name }) => (
                <button
                  key={icon}
                  type="button"
                  className={`btn btn--icon btn--inverse btn--${color}`}
                  aria-label={name}
                >
                  <Icon name={icon} size={18} />
                </button>
              ))}
            </div>
            <div className="button-sheet__row">
              {ICONS.map(({ color, icon, name }) => (
                <button
                  key={icon}
                  type="button"
                  className={`btn btn--icon btn--outline btn--rounded btn--${color}`}
                  aria-label={name}
                >
                  <Icon name={icon} size={18} />
                </button>
              ))}
            </div>
          </Section>

          <Section title="Button sizes" hint=".btn--{lg|md|sm}">
            <div className="button-sheet__row">
              <button type="button" className="btn btn--secondary btn--lg">btn--lg</button>
              <button type="button" className="btn btn--secondary">default</button>
              <button type="button" className="btn btn--secondary btn--md">btn--md</button>
              <button type="button" className="btn btn--secondary btn--sm btn--rounded">btn--sm</button>
            </div>
            <div className="button-sheet__row">
              <button type="button" className="btn btn--primary" disabled>
                Disabled
              </button>
              <button type="button" className="btn btn--primary is-busy" disabled>
                <Icon name="spinner" /> Saving…
              </button>
            </div>
          </Section>

          <Section title="Block buttons" hint=".btn--block" wide>
            <div className="button-sheet__stack">
              <button type="button" className="btn btn--info btn--block">
                Block button <Icon name="menu" />
              </button>
              <button type="button" className="btn btn--dark btn--block">
                Block button
              </button>
              <button type="button" className="btn btn--primary btn--block btn--rounded">
                <Icon name="plus" /> Add product
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}
