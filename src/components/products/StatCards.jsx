import './StatCards.css'

/**
 * Four summary tiles above the product grid: Total / In stock / Low stock /
 * Out of stock. Shows "—" while loading (counts === null).
 */
const TILES = [
  { key: 'total', label: 'Total', tone: 'neutral' },
  { key: 'in', label: 'In stock', tone: 'in' },
  { key: 'low', label: 'Low stock', tone: 'low' },
  { key: 'out', label: 'Out of stock', tone: 'out' },
]

export default function StatCards({ counts }) {
  return (
    <dl className="stat-cards">
      {TILES.map((tile) => (
        <div key={tile.key} className={`stat-card stat-card--${tile.tone}`}>
          <dt className="stat-card__label">{tile.label}</dt>
          <dd className="stat-card__value">{counts ? counts[tile.key] : '—'}</dd>
        </div>
      ))}
    </dl>
  )
}
