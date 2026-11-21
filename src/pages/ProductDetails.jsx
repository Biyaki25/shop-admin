import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { deleteProduct } from '../data/productStore.js'
import { useProduct } from '../hooks/useProduct.js'
import { formatDate, formatPrice, getStockStatus, pluralize, STOCK_LABELS } from '../utils/format.js'
import Alert from '../components/ui/Alert.jsx'
import BackLink from '../components/ui/BackLink.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import ProductImage from '../components/products/ProductImage.jsx'
import ProductNotFound from './ProductNotFound.jsx'
import './ProductDetails.css'

/**
 * Product details: image on the left, info panel on the right with Edit and
 * Delete. Shows "Product saved successfully." when arriving from the edit page.
 */
export default function ProductDetails() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { status, product } = useProduct(id)

  const [justSaved] = useState(() => Boolean(location.state?.saved))
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const savedRef = useRef(null)

  // Clear router state so a refresh doesn't show the "saved" banner again.
  useEffect(() => {
    if (location.state?.saved) navigate(location.pathname, { replace: true, state: null })
  }, [location, navigate])

  // Move focus to the success banner once the product is on screen.
  useEffect(() => {
    if (justSaved && status === 'ready') savedRef.current?.focus()
  }, [justSaved, status])

  const handleDelete = async () => {
    setDeleting(true)
    const removed = await deleteProduct(product.id)
    // The products page shows "<name> deleted" with an Undo button.
    navigate('/products', { state: { deleted: removed } })
  }

  if (status === 'missing' || status === 'error') return <ProductNotFound />

  const stockStatus = product ? getStockStatus(product.stock) : 'in'

  return (
    <div className="page">
      <div className="container">
        <BackLink />
        <h1 className="page-title">Product details</h1>
        <p className="page-subtitle">Keep every detail of your catalog in focus.</p>

        {justSaved && status === 'ready' && (
          <Alert ref={savedRef} variant="success" className="details__banner">
            Product saved successfully.
          </Alert>
        )}

        {status === 'loading' ? (
          <div className="details" aria-busy="true">
            <div className="details__media skeleton" />
            <div className="details__panel">
              <span className="skeleton skeleton--line" style={{ width: '20%' }} />
              <span className="skeleton skeleton--line" style={{ width: '55%', height: 24 }} />
              <span className="skeleton skeleton--line" style={{ width: '30%', height: 32 }} />
              <span className="skeleton skeleton--line" style={{ width: '90%' }} />
              <span className="skeleton skeleton--line" style={{ width: '80%' }} />
              <span className="visually-hidden">Loading product…</span>
            </div>
          </div>
        ) : (
          <div className="details">
            <div className="details__media">
              <ProductImage
                src={product.imageUrl}
                alt={product.name}
                faded={stockStatus === 'out'}
                className="details__image"
                loading="eager"
              />
            </div>

            <article className="details__panel" aria-labelledby="product-name">
              <p className="eyebrow">{product.category}</p>
              <h2 id="product-name" className="details__name">
                {product.name}
              </h2>
              <p className="details__sku">
                <span>SKU</span> {product.sku}
              </p>
              <p className="details__price">{formatPrice(product.price)}</p>

              <p className="details__stock">
                <span className={`details__stock-status details__stock-status--${stockStatus}`}>
                  <span className="details__dot" aria-hidden="true" />
                  {STOCK_LABELS[stockStatus]}
                </span>
                <span className="details__units">{pluralize(product.stock, 'unit')} available</span>
              </p>

              {product.description ? (
                <p className="details__description">{product.description}</p>
              ) : (
                <p className="details__description details__description--empty">No description yet.</p>
              )}

              <p className="details__updated">
                <span>Last updated</span>
                <time dateTime={product.updatedAt}>{formatDate(product.updatedAt)}</time>
              </p>

              <div className="btn-row details__actions">
                <Link to={`/products/${product.id}/edit`} className="btn btn--primary">
                  Edit product
                </Link>
                <button type="button" className="btn btn--danger" onClick={() => setConfirmOpen(true)}>
                  Delete product
                </button>
              </div>
            </article>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this product?"
        confirmLabel="Delete product"
        busy={deleting}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      >
        “{product?.name}” will be permanently removed from your catalog. This action can’t be undone.
      </ConfirmDialog>
    </div>
  )
}
