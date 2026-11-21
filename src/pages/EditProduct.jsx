import { useEffect, useRef, useState } from 'react'
import { useBlocker, useNavigate, useParams } from 'react-router-dom'
import { updateProduct } from '../data/productStore.js'
import { useProduct } from '../hooks/useProduct.js'
import { productToValues, useProductForm } from '../hooks/useProductForm.js'
import { focusFirstError } from '../utils/focus.js'
import { getStockStatus } from '../utils/format.js'
import { isValidImageUrl } from '../utils/validation.js'
import Alert from '../components/ui/Alert.jsx'
import BackLink from '../components/ui/BackLink.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import ProductFormFields from '../components/products/ProductFormFields.jsx'
import ProductImage from '../components/products/ProductImage.jsx'
import UnsavedChangesBar from '../components/products/UnsavedChangesBar.jsx'
import ProductNotFound from './ProductNotFound.jsx'
import './ProductDetails.css'
import './ProductFormPage.css'

/**
 * Edit product page. Loads the product, then hands it to <EditForm>, which
 * starts with the product's current values. Saving writes to localStorage
 * and returns to the details page, which shows the change straight away.
 *
 * Unsaved edits: changed fields get an amber dot, a sticky "You have unsaved
 * changes" bar offers Discard / Save changes, and leaving the page asks
 * "Leave without saving?" first.
 */
export default function EditProduct() {
  const { id } = useParams()
  const { status, product } = useProduct(id)

  if (status === 'missing' || status === 'error') return <ProductNotFound />

  return (
    <div className="page">
      <div className="container">
        <BackLink />
        <h1 className="page-title">Edit product</h1>
        <p className="page-subtitle">Make a few changes. Keep your catalog current.</p>
      </div>

      {status === 'loading' ? (
        <div className="container">
          <div className="details" aria-busy="true">
            <div className="details__media skeleton" />
            <div className="details__panel">
              <span className="skeleton skeleton--line" style={{ width: '40%' }} />
              <span className="skeleton skeleton--line" style={{ width: '100%', height: 48 }} />
              <span className="skeleton skeleton--line" style={{ width: '40%' }} />
              <span className="skeleton skeleton--line" style={{ width: '100%', height: 48 }} />
              <span className="visually-hidden">Loading product…</span>
            </div>
          </div>
        </div>
      ) : (
        // key: start a fresh form if the user jumps to another product.
        <EditForm key={product.id} product={product} />
      )}
    </div>
  )
}

function EditForm({ product }) {
  const navigate = useNavigate()
  const form = useProductForm(productToValues(product))
  const [saving, setSaving] = useState(false)
  // Set just before we navigate away on purpose (after saving), so the
  // "Leave without saving?" guard lets that navigation through.
  const allowLeaveRef = useRef(false)

  // In-app navigation guard: any link, Back button or Cancel while there are
  // unsaved edits pauses the navigation and opens the dialog below.
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      form.hasChanges && !allowLeaveRef.current && currentLocation.pathname !== nextLocation.pathname,
  )

  // Closing the tab or reloading: browsers only allow their own generic prompt here.
  useEffect(() => {
    if (!form.hasChanges) return
    const onBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [form.hasChanges])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.attemptSubmit()) {
      focusFirstError(form.errors, 'edit')
      return
    }
    setSaving(true)
    await updateProduct(product.id, form.values)
    allowLeaveRef.current = true
    navigate(`/products/${product.id}`, { state: { saved: true } })
  }

  const discard = () => {
    form.reset()
    document.getElementById('edit-name')?.focus()
  }

  const errorCount = Object.keys(form.visibleErrors).length
  // The big image follows the URL field live, as long as the URL is valid.
  const url = form.values.imageUrl.trim()
  const previewSrc = url && isValidImageUrl(url) ? url : ''
  const previewName = form.values.name.trim() || product.name

  return (
    <>
      <div className="container">
        {form.submitted && errorCount > 0 && (
          <Alert variant="error" className="form-page__banner form-page__banner--wide">
            Please correct the {errorCount} highlighted {errorCount === 1 ? 'field' : 'fields'}.
          </Alert>
        )}

        <div className="details">
          <div className="details__media">
            <ProductImage
              src={previewSrc}
              alt={previewName}
              className="details__image"
              faded={getStockStatus(Number(form.values.stock)) === 'out'}
              loading="eager"
            />
          </div>

          <form
            id="edit-form"
            className="details__panel"
            onSubmit={handleSubmit}
            noValidate
            aria-label={`Edit ${product.name}`}
          >
            <ProductFormFields
              form={form}
              idPrefix="edit"
              sku={product.sku}
              disabled={saving}
              showHint={false}
              plainPreview
              previewCaption={previewName}
              markChanges
            />

            {/* With unsaved edits, Save / Discard move to the sticky bar instead. */}
            {!form.hasChanges && (
              <div className="btn-row form-actions">
                <button type="submit" className="btn btn--primary">
                  Save changes
                </button>
                <button type="button" className="btn btn--secondary" onClick={() => navigate(`/products/${product.id}`)}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {form.hasChanges && <UnsavedChangesBar formId="edit-form" saving={saving} onDiscard={discard} />}

      <ConfirmDialog
        open={blocker.state === 'blocked'}
        title="Leave without saving?"
        cancelLabel="Keep editing"
        confirmLabel="Leave page"
        confirmVariant="secondary"
        onCancel={() => blocker.reset?.()}
        onConfirm={() => blocker.proceed?.()}
      >
        Your changes will be lost.
      </ConfirmDialog>
    </>
  )
}
