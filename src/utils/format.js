/** Display helpers for prices, dates and stock levels. */
import { LOW_STOCK_THRESHOLD } from '../data/catalog.js'

const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })

/** 129 -> "$129.00" */
export const formatPrice = (value) => priceFormatter.format(value)

/** ISO date -> "November 17, 2026" */
export const formatDate = (iso) => dateFormatter.format(new Date(iso))

/** Classify a stock count as 'in', 'low' or 'out'. */
export function getStockStatus(stock) {
  if (stock <= 0) return 'out'
  if (stock <= LOW_STOCK_THRESHOLD) return 'low'
  return 'in'
}

export const STOCK_LABELS = { in: 'In stock', low: 'Low stock', out: 'Out of stock' }

/** Badge text from the mock-up: "In stock · 24", "Low stock · 3", "Out of stock". */
export function stockBadgeText(stock) {
  const status = getStockStatus(stock)
  return status === 'out' ? STOCK_LABELS.out : `${STOCK_LABELS[status]} · ${stock}`
}

/** Plural helper: pluralize(1, 'product') -> "1 product" */
export const pluralize = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`

const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

/**
 * Relative "saved" time for the draft caption:
 * "just now", "3 minutes ago", "at 2:45 PM", or a date for older drafts.
 */
export function formatSavedAgo(savedAt, now) {
  const seconds = Math.max(0, (now - savedAt) / 1000)
  if (seconds < 45) return 'just now'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${pluralize(minutes, 'minute')} ago`
  const saved = new Date(savedAt)
  if (saved.toDateString() === new Date(now).toDateString()) return `at ${timeFormatter.format(saved)}`
  return `on ${formatDate(savedAt)}`
}
