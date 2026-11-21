import { Link } from 'react-router-dom'
import { formatPrice, getStockStatus } from '../../utils/format.js'
import ProductImage from './ProductImage.jsx'
import StockBadge from './StockBadge.jsx'
import './ProductCard.css'

/**
 * One tile in the products grid. The whole card is a single link to the
 * product's details page (one tab stop, readable link text = product name).
 */
export default function ProductCard({ product }) {
  const outOfStock = getStockStatus(product.stock) === 'out'
  return (
    <article className="product-card">
      <div className="product-card__media">
        <ProductImage src={product.imageUrl} alt={product.name} faded={outOfStock} />
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">
          {/* The ::after on this link stretches it over the whole card. */}
          <Link to={`/products/${product.id}`} className="product-card__link">
            {product.name}
          </Link>
        </h3>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <StockBadge stock={product.stock} />
      </div>
    </article>
  )
}

/** Grey shimmering placeholder card shown while products load. */
export function ProductCardSkeleton() {
  return (
    <div className="product-card product-card--skeleton" aria-hidden="true">
      <div className="product-card__media skeleton" />
      <div className="product-card__body">
        <span className="skeleton skeleton--line" style={{ width: '30%' }} />
        <span className="skeleton skeleton--line" style={{ width: '68%', height: 14 }} />
        <span className="skeleton skeleton--line" style={{ width: '32%', height: 14 }} />
        <span className="skeleton skeleton--line" style={{ width: '30%', height: 14 }} />
      </div>
    </div>
  )
}
