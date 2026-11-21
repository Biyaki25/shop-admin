import { CATEGORIES } from '../../data/catalog.js'
import ImagePreview from './ImagePreview.jsx'
import './ProductForm.css'

/**
 * Small amber dot after a label whose value was edited. The hidden text makes
 * screen readers say "(changed)" after the label.
 */
function ChangedDot({ show }) {
  if (!show) return null
  return (
    <>
      <span className="field__changed-dot" aria-hidden="true" />
      <span className="visually-hidden">(changed)</span>
    </>
  )
}

/** The decorative "*" after required labels (aria-required carries the meaning). */
function Required() {
  return (
    <span className="field__required" aria-hidden="true">
      *
    </span>
  )
}

/**
 * The product fields shared by Add product and Edit product.
 *
 * Accessibility:
 *  - every input has a visible <label>
 *  - invalid inputs get aria-invalid and point to their error text with
 *    aria-describedby, so screen readers read the error with the field
 *  - required fields use aria-required (the "*" is decorative)
 *
 * Props:
 *  form        – object returned by useProductForm()
 *  idPrefix    – keeps ids unique ("add" / "edit")
 *  disabled    – lock every field (while saving, or after a successful add)
 *  sku         – shows the read-only SKU field (edit only)
 *  showHint    – show "Use a public JPG, PNG, or WebP image URL."
 *  showPreview – show the image preview box
 *  previewCaption, plainPreview – passed to <ImagePreview>
 *  markChanges – show an amber dot next to labels of edited fields (Edit page)
 */
export default function ProductFormFields({
  form,
  idPrefix,
  disabled = false,
  sku,
  showHint = true,
  showPreview = true,
  previewCaption,
  plainPreview = false,
  markChanges = false,
}) {
  const { values, visibleErrors, setField, touch, changed } = form
  const dot = (field) => <ChangedDot show={markChanges && changed[field]} />
  const id = (field) => `${idPrefix}-${field}`

  /** Common props wiring a field to the form state and its error message. */
  const bind = (field, extraDescribedBy) => {
    const error = visibleErrors[field]
    const describedBy = [error ? `${id(field)}-error` : null, extraDescribedBy].filter(Boolean).join(' ')
    return {
      id: id(field),
      name: field,
      value: values[field],
      disabled,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy || undefined,
      onChange: (event) => setField(field, event.target.value),
      onBlur: () => touch(field),
    }
  }

  const errorText = (field) =>
    visibleErrors[field] ? (
      <p id={`${id(field)}-error`} className="field__error">
        {visibleErrors[field]}
      </p>
    ) : null

  return (
    <div className="product-fields">
      <div className="field">
        <label htmlFor={id('name')} className="field__label">
          Product name <Required />
          {dot('name')}
        </label>
        <input
          {...bind('name')}
          type="text"
          className="input"
          placeholder="Enter product name"
          autoComplete="off"
          aria-required="true"
          maxLength={160}
        />
        {errorText('name')}
      </div>

      {sku && (
        <div className="field">
          <label htmlFor={id('sku')} className="field__label">
            SKU · read-only
          </label>
          <input id={id('sku')} type="text" className="input" value={sku} readOnly />
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor={id('price')} className="field__label">
            Price ($) <Required />
          {dot('price')}
          </label>
          <input
            {...bind('price')}
            type="number"
            inputMode="decimal"
            step="0.01"
            className="input"
            placeholder="0.00"
            aria-required="true"
            onBlur={() => {
              // Tidy valid prices to two decimals when leaving the field ("129" -> "129.00").
              const n = Number(values.price)
              if (values.price !== '' && Number.isFinite(n) && n > 0) setField('price', n.toFixed(2))
              touch('price')
            }}
          />
          {errorText('price')}
        </div>
        <div className="field">
          <label htmlFor={id('stock')} className="field__label">
            Stock <Required />
          {dot('stock')}
          </label>
          <input
            {...bind('stock')}
            type="number"
            inputMode="numeric"
            step="1"
            className="input"
            placeholder="0"
            aria-required="true"
          />
          {errorText('stock')}
        </div>
      </div>

      <div className="field">
        <label htmlFor={id('category')} className="field__label">
          Category <Required />
          {dot('category')}
        </label>
        <select {...bind('category')} className="input" aria-required="true">
          <option value="" disabled>
            Select a category
          </option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errorText('category')}
      </div>

      <div className="field">
        <label htmlFor={id('description')} className="field__label">
          Description
          {dot('description')}
        </label>
        <textarea
          {...bind('description')}
          className="input"
          rows={3}
          placeholder="Tell customers what makes this product special…"
          maxLength={1000}
        />
      </div>

      <div className="field">
        <label htmlFor={id('imageUrl')} className="field__label">
          Image URL
          {dot('imageUrl')}
        </label>
        <input
          {...bind('imageUrl', showHint ? `${id('imageUrl')}-hint` : undefined)}
          type="url"
          inputMode="url"
          className="input"
          placeholder="https://example.com/product.jpg"
          autoComplete="off"
        />
        {errorText('imageUrl')}
        {showPreview && (
          <ImagePreview url={values.imageUrl} caption={previewCaption} plain={plainPreview} />
        )}
        {showHint && (
          <p id={`${id('imageUrl')}-hint`} className="field__hint product-fields__hint">
            Use a public JPG, PNG, or WebP image URL.
          </p>
        )}
      </div>
    </div>
  )
}
