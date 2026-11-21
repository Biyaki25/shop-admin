/**
 * Catalog constants shared by the store, forms and filters.
 */

/** Categories shown in the mock-up's Category dropdown, in the same order. */
export const CATEGORIES = ['Electronics', 'Accessories', 'Home & living', 'Footwear', 'Lifestyle']

/** Two-letter codes used to build SKUs, e.g. Electronics -> SA-EL-001. */
export const CATEGORY_CODES = {
  Electronics: 'EL',
  Accessories: 'AC',
  'Home & living': 'HL',
  Footwear: 'FW',
  Lifestyle: 'LS',
}

/**
 * Stock at or below this number counts as "Low stock".
 * The mock-up shows 3 units as low and 12+ as in stock; 5 sits in between.
 */
export const LOW_STOCK_THRESHOLD = 5

/** Options for the Stock filter on the products page. */
export const STOCK_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'in', label: 'In stock' },
  { value: 'low', label: 'Low stock' },
  { value: 'out', label: 'Out of stock' },
]

/** Options for the "Sort by" dropdown. Name A-Z is the default in the mock-up. */
export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'stock-asc', label: 'Stock: low to high' },
  { value: 'newest', label: 'Recently updated' },
]
