import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../data/productStore.js'
import { CATEGORIES } from '../data/catalog.js'
import { countByStock } from '../utils/filterProducts.js'
import { formatDate, getStockStatus, STOCK_LABELS } from '../utils/format.js'
import Icon from '../components/ui/Icon.jsx'
import StatusCard from '../components/ui/StatusCard.jsx'
import ProductImage from '../components/products/ProductImage.jsx'
import StockBadge from '../components/products/StockBadge.jsx'
import './Dashboard.css'

const compactMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})
const wholeMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('en-US')

/** Exact under $100K ($11,042), then compact: $412.9K, $4.2M. */
const formatMoney = (value) => (value < 100_000 ? wholeMoney : compactMoney).format(value)

const STATUS_ORDER = ['in', 'low', 'out']

/** Everything the dashboard shows, worked out from the product list. */
function summarize(products) {
  const counts = countByStock(products)
  // Known categories first (stable order for ties), then any others found.
  const perCategory = new Map(CATEGORIES.map((name) => [name, 0]))
  for (const p of products) perCategory.set(p.category, (perCategory.get(p.category) ?? 0) + 1)
  const byCategory = [...perCategory].map(([name, count]) => ({ name, count }))

  return {
    counts,
    value: products.reduce((sum, p) => sum + p.price * p.stock, 0),
    units: products.reduce((sum, p) => sum + p.stock, 0),
    byCategory: byCategory.filter((c) => c.count > 0).sort((a, b) => b.count - a.count),
    restock: products.filter((p) => getStockStatus(p.stock) !== 'in').sort((a, b) => a.stock - b.stock),
    recent: [...products].sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')).slice(0, 5),
  }
}

/**
 * Home page: an at-a-glance dashboard of the catalog — KPI tiles, stock
 * status, products per category, what needs restocking and what changed last.
 */
export default function Dashboard() {
  const [data, setData] = useState({ status: 'loading', products: [] })
  const [reloadKey, setReloadKey] = useState(0)

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
    setReloadKey((k) => k + 1)
  }

  const ready = data.status === 'ready'
  const summary = ready ? summarize(data.products) : null

  return (
    <div className="page dashboard">
      <div className="container">
        <header className="page-head">
          <div>
            <p className="eyebrow">Overview</p>
            <h1 className="page-title page-head__title">Dashboard</h1>
            <p className="page-subtitle">How your catalog is doing today.</p>
          </div>
          <div className="dashboard__actions">
            <Link to="/products" className="btn btn--secondary btn--md">
              View products
            </Link>
            <Link to="/products/new" className="btn btn--primary btn--md">
              <Icon name="plus" size={14} strokeWidth={2.5} />
              Add Product
            </Link>
          </div>
        </header>

        {data.status === 'error' ? (
          <div className="dashboard__section">
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
            </StatusCard>
          </div>
        ) : (
          <>
            <KpiTiles summary={summary} />

            <div className="dashboard__grid">
              <StockStatusCard summary={summary} />
              <CategoryCard summary={summary} />
            </div>

            <div className="dashboard__grid dashboard__grid--wide-left">
              <RecentCard summary={summary} />
              <RestockCard summary={summary} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ---------- KPI tiles ---------- */

function KpiTiles({ summary }) {
  const tiles = [
    { label: 'Total products', icon: 'box', tone: 'primary', value: summary && number.format(summary.counts.total) },
    { label: 'Inventory value', icon: 'layers', tone: 'info', value: summary && formatMoney(summary.value) },
    { label: 'Units in stock', icon: 'grid', tone: 'success', value: summary && number.format(summary.units) },
    {
      label: 'Needs attention',
      icon: 'alert',
      tone: 'warning',
      value: summary && number.format(summary.counts.low + summary.counts.out),
      note: summary && `${summary.counts.low} low · ${summary.counts.out} out`,
    },
  ]

  return (
    <section className="dashboard__section" aria-label="Key figures">
      <dl className="kpi-tiles">
        {tiles.map((tile) => (
          <div key={tile.label} className="card kpi-tile">
            <span className={`kpi-tile__icon kpi-tile__icon--${tile.tone}`} aria-hidden="true">
              <Icon name={tile.icon} size={20} />
            </span>
            <div>
              <dt className="kpi-tile__label">{tile.label}</dt>
              <dd className="kpi-tile__value">{tile.value ?? '—'}</dd>
              {tile.note && <dd className="kpi-tile__note">{tile.note}</dd>}
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ---------- Stock status: thin segmented bar + legend ---------- */

function StockStatusCard({ summary }) {
  const total = summary?.counts.total ?? 0
  const share = (n) => (total ? Math.round((n / total) * 100) : 0)

  return (
    <section className="card dashboard-card" aria-labelledby="stock-status-title">
      <h2 id="stock-status-title" className="dashboard-card__title">
        Stock status
      </h2>
      <p className="dashboard-card__hint">Share of products by stock level</p>

      {summary ? (
        <>
          {/* Decorative: the legend below carries every number. */}
          <div className="segment-bar" aria-hidden="true">
            {STATUS_ORDER.filter((s) => summary.counts[s] > 0).map((s) => (
              <span
                key={s}
                className={`segment-bar__part segment-bar__part--${s}`}
                style={{ flexGrow: summary.counts[s] }}
                title={`${STOCK_LABELS[s]}: ${summary.counts[s]} (${share(summary.counts[s])}%)`}
              />
            ))}
          </div>
          <ul className="status-legend">
            {STATUS_ORDER.map((s) => (
              <li key={s} className="status-legend__item">
                <span className={`status-legend__swatch status-legend__swatch--${s}`} aria-hidden="true" />
                <span className="status-legend__name">{STOCK_LABELS[s]}</span>
                <span className="status-legend__value">
                  {summary.counts[s]} <span className="status-legend__share">· {share(summary.counts[s])}%</span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="dashboard-card__skeleton" />
      )}
    </section>
  )
}

/* ---------- Products by category: one-hue horizontal bars ---------- */

function CategoryCard({ summary }) {
  const max = summary ? Math.max(1, ...summary.byCategory.map((c) => c.count)) : 1

  return (
    <section className="card dashboard-card" aria-labelledby="category-title">
      <h2 id="category-title" className="dashboard-card__title">
        Products by category
      </h2>
      <p className="dashboard-card__hint">Number of products in each category</p>

      {summary ? (
        summary.byCategory.length ? (
          <ul className="category-bars">
            {summary.byCategory.map((c) => (
              <li key={c.name} className="category-bars__row" title={`${c.name}: ${c.count}`}>
                <span className="category-bars__name">{c.name}</span>
                <span className="category-bars__track">
                  <span className="category-bars__bar" style={{ width: `${(c.count / max) * 100}%` }} />
                  <span className="category-bars__value">{c.count}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dashboard-card__empty">No products yet.</p>
        )
      ) : (
        <div className="dashboard-card__skeleton" />
      )}
    </section>
  )
}

/* ---------- Recently updated table ---------- */

function RecentCard({ summary }) {
  return (
    <section className="card dashboard-card" aria-labelledby="recent-title">
      <div className="dashboard-card__head">
        <div>
          <h2 id="recent-title" className="dashboard-card__title">
            Recently updated
          </h2>
          <p className="dashboard-card__hint">The last products you added or changed</p>
        </div>
        <Link to="/products" className="link-button dashboard-card__link">
          View all
        </Link>
      </div>

      {summary ? (
        summary.recent.length ? (
          <div className="recent-table__scroll">
            <table className="recent-table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col" className="recent-table__price">
                    Price
                  </th>
                  <th scope="col">Stock</th>
                  <th scope="col" className="recent-table__date">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {summary.recent.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link to={`/products/${p.id}`} className="recent-table__product">
                        <span className="recent-table__thumb">
                          <ProductImage src={p.imageUrl} alt="" faded={p.stock <= 0} />
                        </span>
                        <span>
                          <span className="recent-table__name">{p.name}</span>
                          <span className="recent-table__category">{p.category}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="recent-table__num recent-table__price">{wholeMoney.format(p.price)}</td>
                    <td>
                      <StockBadge stock={p.stock} />
                    </td>
                    <td className="recent-table__date">{p.updatedAt ? formatDate(p.updatedAt) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="dashboard-card__empty">No products yet.</p>
        )
      ) : (
        <div className="dashboard-card__skeleton dashboard-card__skeleton--tall" />
      )}
    </section>
  )
}

/* ---------- Needs restocking list ---------- */

function RestockCard({ summary }) {
  return (
    <section className="card dashboard-card" aria-labelledby="restock-title">
      <h2 id="restock-title" className="dashboard-card__title">
        Needs restocking
      </h2>
      <p className="dashboard-card__hint">Low or out of stock, emptiest first</p>

      {summary ? (
        summary.restock.length ? (
          <ul className="restock-list">
            {summary.restock.map((p) => (
              <li key={p.id} className="restock-list__item">
                <div className="restock-list__text">
                  <Link to={`/products/${p.id}`} className="restock-list__name">
                    {p.name}
                  </Link>
                  <StockBadge stock={p.stock} />
                </div>
                <Link
                  to={`/products/${p.id}/edit`}
                  className="btn btn--primary btn--inverse btn--sm"
                  aria-label={`Restock ${p.name}`}
                >
                  Restock
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dashboard-card__empty">
            <Icon name="check" size={16} /> Everything is well stocked.
          </p>
        )
      ) : (
        <div className="dashboard-card__skeleton dashboard-card__skeleton--tall" />
      )}
    </section>
  )
}
