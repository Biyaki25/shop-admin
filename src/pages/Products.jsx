import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getProducts, restoreProduct } from '../data/productStore.js'
import { countByStock, filterProducts } from '../utils/filterProducts.js'
import { pluralize } from '../utils/format.js'
import Icon from '../components/ui/Icon.jsx'
import StatusCard from '../components/ui/StatusCard.jsx'
import Toast from '../components/ui/Toast.jsx'
import StatCards from '../components/products/StatCards.jsx'
import ProductToolbar from '../components/products/ProductToolbar.jsx'
import ProductCard, { ProductCardSkeleton } from '../components/products/ProductCard.jsx'
import './Products.css'

const DEFAULT_FILTERS = { query: '', category: 'all', stock: 'all', sort: 'name-asc' }
const URL_KEYS = { query: 'q', category: 'category', stock: 'stock', sort: 'sort' }
const TOAST_MS = 5000

/**
 * Products page: summary tiles, live search + filters, and the product grid.
 *
 * Search and filter values live in the URL (?q=lamp&category=Electronics), so
 * they survive a refresh and the browser Back button returns to the same view.
 * Filtering happens in memory on every keystroke — no reloads.
 */
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState({ status: 'loading', products: [] })
  const [reloadKey, setReloadKey] = useState(0)

  // "Studio headphones deleted. Undo" toast, passed here by the details page.
  const [toast, setToast] = useState(() =>
    location.state?.deleted ? { ...location.state.deleted, message: `${location.state.deleted.product.name} deleted.` } : null,
  )

  /* ---------- Data loading ---------- */
  useEffect(() => {
    let active = true
    getProducts()
      .then((products) => active && setData({ status: 'ready', products }))
      .catch(() => active && setData({ status: 'error', products: [] }))
    return () => {
      active = false
    }
  }, [reloadKey])

  const reload = () => {
    setData({ status: 'loading', products: [] })
    // Drop the ?simulate=error demo flag so "Try again" can succeed.
    if (searchParams.has('simulate')) {
      const next = new URLSearchParams(searchParams)
      next.delete('simulate')
      setSearchParams(next, { replace: true })
    }
    setReloadKey((k) => k + 1)
  }

  /* ---------- Toast handling ---------- */

  // Clear the router state so a refresh doesn't show the "deleted" toast again.
  useEffect(() => {
    if (location.state?.deleted) {
      navigate(`${location.pathname}${location.search}`, { replace: true, state: null })
    }
  }, [location, navigate])

  const undoDelete = async () => {
    const { product, index } = toast
    await restoreProduct(product, index)
    setToast({ message: `${product.name} restored.` })
    setReloadKey((k) => k + 1)
  }

  /* ---------- Filters (stored in the URL) ---------- */
  const filters = {
    query: searchParams.get(URL_KEYS.query) ?? DEFAULT_FILTERS.query,
    category: searchParams.get(URL_KEYS.category) ?? DEFAULT_FILTERS.category,
    stock: searchParams.get(URL_KEYS.stock) ?? DEFAULT_FILTERS.stock,
    sort: searchParams.get(URL_KEYS.sort) ?? DEFAULT_FILTERS.sort,
  }

  const updateFilters = (patch) => {
    const next = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(patch)) {
      // Keep the URL tidy: leave out values that equal the default.
      if (value === DEFAULT_FILTERS[key]) next.delete(URL_KEYS[key])
      else next.set(URL_KEYS[key], value)
    }
    setSearchParams(next, { replace: true })
  }

  const clearAll = () => updateFilters({ query: '', category: 'all', stock: 'all' })

  const { products, status } = data
  // Re-filtered on every render (every keystroke); cheap for a store-sized catalog.
  const visible = filterProducts(products, filters)
  const counts = status === 'ready' ? countByStock(products) : null
  const isFiltered = filters.query.trim() !== '' || filters.category !== 'all' || filters.stock !== 'all'

  /* ---------- Render ---------- */
  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <div>
            <p className="eyebrow">Catalog</p>
            <h1 className="page-title page-head__title">Products</h1>
            <p className="page-subtitle">Your products, all in one place.</p>
          </div>
          <Link to="/products/new" className="btn btn--primary page-head__action">
            <Icon name="plus" size={14} strokeWidth={2.5} />
            Add Product
          </Link>
        </header>

        {toast && (
          <div className="products__toast">
            {/* key: a new message restarts the 5-second countdown */}
            <Toast
              key={toast.message}
              duration={TOAST_MS}
              onDismiss={() => setToast(null)}
              action={
                toast.product && (
                  <button type="button" className="toast__action" onClick={undoDelete}>
                    Undo
                  </button>
                )
              }
            >
              {toast.message}
            </Toast>
          </div>
        )}

        {status === 'error' ? (
          <div className="products__section">
            <StatusCard
              icon="alert"
              tone="danger"
              title="Couldn't load products"
              action={
                <button type="button" className="btn btn--primary btn--sm" onClick={reload}>
                  Try again
                </button>
              }
            >
              Something went wrong while connecting to your catalog.
              <br />
              Please try again in a moment.
            </StatusCard>
          </div>
        ) : (
          <>
            <section className="products__section" aria-label="Stock summary">
              <StatCards counts={counts} />
            </section>

            <section className="products__section" aria-labelledby="results-heading">
              <h2 id="results-heading" className="visually-hidden">
                Product list
              </h2>
              <ProductToolbar
                filters={filters}
                onChange={updateFilters}
                onClearAll={clearAll}
                disabled={status === 'loading'}
              />

              {/* Live region: screen readers hear the new count as the user types. */}
              <p className="products__count" role="status">
                {status === 'loading'
                  ? 'Loading products…'
                  : isFiltered
                    ? `Showing ${visible.length} of ${pluralize(products.length, 'product')}`
                    : `Showing ${pluralize(products.length, 'product')}`}
              </p>

              {status === 'loading' ? (
                <div className="product-grid" aria-busy="true">
                  {Array.from({ length: 8 }, (_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <StatusCard
                  compact
                  icon="box"
                  title="No products yet"
                  action={
                    <Link to="/products/new" className="btn btn--primary btn--sm">
                      Add Product
                    </Link>
                  }
                >
                  Add your first product to start building your catalog.
                </StatusCard>
              ) : visible.length === 0 ? (
                <StatusCard
                  compact
                  icon="search"
                  title="No products found"
                  action={
                    <button type="button" className="btn btn--primary btn--sm" onClick={clearAll}>
                      {filters.category === 'all' && filters.stock === 'all' ? 'Clear search' : 'Clear all filters'}
                    </button>
                  }
                >
                  {filters.query.trim() ? (
                    <>
                      We couldn’t find a match for “{filters.query.trim()}”.
                      <br />
                      Try another name or clear your search.
                    </>
                  ) : (
                    'No products match these filters. Try a different combination or clear them.'
                  )}
                </StatusCard>
              ) : (
                <>
                  <ul className="product-grid">
                    {visible.map((product) => (
                      <li key={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                  <p className="products__footnote">
                    Showing 1–{visible.length} of {pluralize(visible.length, 'product')}
                  </p>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}
