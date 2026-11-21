import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../data/productStore.js'
import ProductImage from '../components/products/ProductImage.jsx'
import { formatPrice, getStockStatus } from '../utils/format.js'
import './Landing.css'

const FEATURES = [
  {
    title: 'Add products',
    text: 'From fresh arrivals to customer favorites, get every detail ready to sell.',
    to: '/products/new',
  },
  {
    title: 'Edit with confidence',
    text: 'Update prices and stock levels without losing sight of the bigger picture.',
    to: '/products',
  },
  {
    title: 'Find it instantly',
    text: 'Search your whole catalog and get straight to the product you need.',
    to: '/products',
  },
]

/**
 * Landing page: explains what ShopAdmin is for, with a live "Catalog
 * spotlight" card (the Studio headphones from the store, or the first product
 * if those were deleted) and three feature cards.
 */
export default function Landing() {
  const [spotlight, setSpotlight] = useState(undefined) // undefined = loading, null = none

  useEffect(() => {
    let active = true
    getProducts()
      .then((products) => {
        if (active) setSpotlight(products.find((p) => p.id === '1') ?? products[0] ?? null)
      })
      .catch(() => active && setSpotlight(null))
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="landing">
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">Your store. Simplified.</p>
            <h1 id="hero-title" className="hero__title">
              Less busywork.
              <br />
              More room to grow.
            </h1>
            <p className="hero__lead">
              Meet your store’s new home base. Add products, fine-tune prices, and keep your catalog in perfect
              order — all in one place.
            </p>
            <Link to="/products" className="btn btn--primary hero__cta">
              Manage Products
            </Link>
            <p className="hero__note">A little less admin. A lot more possibility.</p>
          </div>

          <SpotlightCard product={spotlight} />
        </section>

        <section className="features" aria-labelledby="features-title">
          <h2 id="features-title" className="features__title">
            Everything your catalog needs.
          </h2>
          <ol className="features__list">
            {FEATURES.map((feature, index) => (
              <li key={feature.title}>
                <Link to={feature.to} className="feature-card">
                  <span className="feature-card__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__text">{feature.text}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}

/** The white product card on the right of the hero. */
function SpotlightCard({ product }) {
  if (product === undefined) {
    return <div className="spotlight spotlight--loading" aria-hidden="true" />
  }
  if (product === null) return null

  const status = getStockStatus(product.stock)
  return (
    <Link to={`/products/${product.id}`} className="spotlight">
      <div className="spotlight__media">
        <ProductImage src={product.imageUrl} alt={product.name} faded={status === 'out'} loading="eager" />
      </div>
      <div className="spotlight__body">
        <p className="eyebrow eyebrow--light spotlight__eyebrow">Catalog spotlight</p>
        <p className="spotlight__name">{product.name}</p>
        <div className="spotlight__meta">
          <span className="spotlight__price">{formatPrice(product.price)}</span>
          <span className={`spotlight__stock spotlight__stock--${status}`}>
            {status === 'out' ? 'Out of stock' : `${product.stock} in stock`}
          </span>
        </div>
      </div>
    </Link>
  )
}
