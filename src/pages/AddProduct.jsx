import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct } from '../data/productStore.js'
import { useDraft } from '../hooks/useDraft.js'
import { EMPTY_PRODUCT_VALUES, useProductForm } from '../hooks/useProductForm.js'
import { formatSavedAgo } from '../utils/format.js'
import { focusFirstError } from '../utils/focus.js'
import Alert from '../components/ui/Alert.jsx'
import BackLink from '../components/ui/BackLink.jsx'
import Icon from '../components/ui/Icon.jsx'
import ProductFormFields from '../components/products/ProductFormFields.jsx'
import ProductTips from '../components/products/ProductTips.jsx'
import './ProductFormPage.css'

const DRAFT_KEY = 'shopadmin.addProductDraft'
const isBlank = (values) => Object.values(values).every((v) => String(v).trim() === '')

/**
 * Add product page.
 * Phases: 'editing' -> 'saving' -> 'done'. After a successful add the fields
 * lock (grey), a green banner confirms it, and the buttons change to
 * "Back to products" / "Add another product" — as in the mock-up.
 *
 * While editing, the form autosaves a draft to localStorage ("Draft saved
 * just now" under the form title), so a refresh or an accidental Cancel
 * doesn't lose work. The draft is removed once the product is added.
 */
export default function AddProduct() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('editing')
  // Read any saved draft first so the form can start from it.
  const [startValues] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY))
      return saved?.values ? { ...EMPTY_PRODUCT_VALUES, ...saved.values } : EMPTY_PRODUCT_VALUES
    } catch {
      return EMPTY_PRODUCT_VALUES
    }
  })
  const form = useProductForm(startValues)
  const draft = useDraft(DRAFT_KEY, form.values, { enabled: phase === 'editing', isEmpty: isBlank })
  const [created, setCreated] = useState(null)
  const successRef = useRef(null)

  // Announce + focus the success banner once the product is saved.
  useEffect(() => {
    if (phase === 'done') successRef.current?.focus()
  }, [phase])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.attemptSubmit()) {
      focusFirstError(form.errors, 'add')
      return
    }
    setPhase('saving')
    const product = await createProduct(form.values)
    draft.clearDraft()
    setCreated(product)
    setPhase('done')
  }

  const discardDraft = () => {
    draft.clearDraft()
    form.reset(EMPTY_PRODUCT_VALUES)
    document.getElementById('add-name')?.focus()
  }

  const addAnother = () => {
    form.reset(EMPTY_PRODUCT_VALUES)
    setCreated(null)
    setPhase('editing')
    // Wait for the fields to unlock before focusing the first one.
    requestAnimationFrame(() => document.getElementById('add-name')?.focus())
  }

  const errorCount = Object.keys(form.visibleErrors).length
  const showSummary = form.submitted && errorCount > 0 && phase === 'editing'

  // The subtitle changes with the form's state (copy from the mock-ups).
  let subtitle = 'A new addition to your catalog starts here.'
  if (phase !== 'done') {
    if (form.visibleErrors.imageUrl) subtitle = 'Check your image URL before adding this product.'
    else if (form.requiredComplete && !form.values.imageUrl.trim())
      subtitle = 'Add an image URL, or continue without a product image.'
    else if (form.requiredComplete && !form.errors.imageUrl)
      subtitle = 'Your product is ready. Review the details and add it.'
  }

  return (
    <div className="page">
      <div className="container">
        <BackLink />
        <h1 className="page-title">Add product</h1>
        <p className="page-subtitle" aria-live="polite">
          {subtitle}
        </p>

        {showSummary && (
          <Alert variant="error" className="form-page__banner">
            Please check the {errorCount} highlighted {errorCount === 1 ? 'field' : 'fields'}.
          </Alert>
        )}
        {phase === 'done' && created && (
          <Alert ref={successRef} variant="success" className="form-page__banner">
            {created.name} added successfully.
          </Alert>
        )}

        <div className="form-page">
          <form className="form-card" onSubmit={handleSubmit} noValidate aria-labelledby="form-title">
            <h2 id="form-title" className="form-card__title">
              Product information
            </h2>
            {phase === 'editing' && draft.savedAt && (
              <p className="form-card__draft">
                Draft saved {formatSavedAgo(draft.savedAt, draft.now)}
                <span aria-hidden="true"> · </span>
                <button type="button" className="form-card__draft-discard" onClick={discardDraft}>
                  Discard draft
                </button>
              </p>
            )}
            <p className="form-card__note">Fields marked * are required.</p>

            <ProductFormFields
              form={form}
              idPrefix="add"
              disabled={phase !== 'editing'}
              showPreview={form.isDirty}
            />

            <div className="btn-row form-actions">
              {phase === 'done' ? (
                <>
                  <Link to="/products" className="btn btn--primary">
                    Back to products
                  </Link>
                  <button type="button" className="btn btn--secondary" onClick={addAnother}>
                    Add another product
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className={`btn btn--primary ${phase === 'saving' ? 'is-busy' : ''}`}
                    disabled={phase === 'saving'}
                  >
                    {phase === 'saving' && <Icon name="spinner" size={16} />}
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => navigate('/products')}
                    disabled={phase === 'saving'}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>

          <ProductTips />
        </div>
      </div>
    </div>
  )
}
