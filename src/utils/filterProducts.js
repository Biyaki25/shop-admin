/**
 * Search, filter and sort the product list for the products page.
 * Pure function so it is easy to test and runs on every keystroke.
 */
import { getStockStatus } from './format.js'

/**
 * @param {Array} products
 * @param {{query?: string, category?: string, stock?: string, sort?: string}} options
 *   query    – matched against name and category, case-insensitive
 *   category – 'all' or a category name
 *   stock    – 'all' | 'in' | 'low' | 'out'
 *   sort     – one of SORT_OPTIONS values
 */
export function filterProducts(products, { query = '', category = 'all', stock = 'all', sort = 'name-asc' } = {}) {
  const needle = query.trim().toLowerCase()

  const matches = products.filter((product) => {
    if (needle) {
      const haystack = `${product.name} ${product.category}`.toLowerCase()
      if (!haystack.includes(needle)) return false
    }
    if (category !== 'all' && product.category !== category) return false
    if (stock !== 'all' && getStockStatus(product.stock) !== stock) return false
    return true
  })

  return sortProducts(matches, sort)
}

const byName = (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })

function sortProducts(list, sort) {
  const sorted = [...list]
  switch (sort) {
    case 'name-desc':
      return sorted.sort((a, b) => byName(b, a))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price || byName(a, b))
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price || byName(a, b))
    case 'stock-asc':
      return sorted.sort((a, b) => a.stock - b.stock || byName(a, b))
    case 'newest':
      return sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || byName(a, b))
    case 'name-asc':
    default:
      return sorted.sort(byName)
  }
}

/** Count products per stock status for the summary cards. */
export function countByStock(products) {
  const counts = { total: products.length, in: 0, low: 0, out: 0 }
  for (const p of products) counts[getStockStatus(p.stock)] += 1
  return counts
}
