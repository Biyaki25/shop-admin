import { getStockStatus, stockBadgeText } from '../../utils/format.js'
import './StockBadge.css'

/** Coloured pill: green "In stock · 24", amber "Low stock · 3", red "Out of stock". */
export default function StockBadge({ stock }) {
  const status = getStockStatus(stock)
  return <span className={`stock-badge stock-badge--${status}`}>{stockBadgeText(stock)}</span>
}
