import { useEffect, useRef } from 'react'
import { CATEGORIES, SORT_OPTIONS, STOCK_FILTERS } from '../../data/catalog.js'
import Icon from '../ui/Icon.jsx'
import Select from '../ui/Select.jsx'
import './ProductToolbar.css'

const CATEGORY_OPTIONS = [{ value: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]

/**
 * Search box + Category / Stock / Sort dropdowns + active-filter chips.
 *
 * The search filters as you type (the parent re-filters on every change, no
 * submit and no page reload). Press "/" anywhere on the page to jump to the
 * search box, and Escape inside it to clear it.
 */
export default function ProductToolbar({ filters, onChange, onClearAll, disabled = false }) {
  const searchRef = useRef(null)
  const { query, category, stock, sort } = filters

  // Global "/" shortcut, shown as the small key hint inside the search box.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const tag = event.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || event.target.isContentEditable) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const clearSearch = () => {
    onChange({ query: '' })
    searchRef.current?.focus()
  }

  const chips = []
  if (category !== 'all') chips.push({ key: 'category', label: `Category: ${category}` })
  if (stock !== 'all') {
    chips.push({ key: 'stock', label: `Stock: ${STOCK_FILTERS.find((s) => s.value === stock)?.label}` })
  }

  return (
    <div className="toolbar">
      <div className="toolbar__controls" role="search">
        <div className={`search ${disabled ? 'is-disabled' : ''}`}>
          <Icon name="search" size={16} className="search__icon" />
          <label htmlFor="product-search" className="visually-hidden">
            Search products by name or category
          </label>
          <input
            ref={searchRef}
            id="product-search"
            type="search"
            className="search__input"
            placeholder="Search products…"
            autoComplete="off"
            value={query}
            disabled={disabled}
            onChange={(event) => onChange({ query: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && query) {
                event.preventDefault()
                clearSearch()
              }
            }}
          />
          {query ? (
            <button type="button" className="search__clear" onClick={clearSearch}>
              <Icon name="x" size={14} />
              <span className="visually-hidden">Clear search text</span>
            </button>
          ) : (
            <kbd className="search__kbd" aria-hidden="true">
              /
            </kbd>
          )}
        </div>

        <Select
          className="toolbar__category"
          label="Category"
          value={category}
          options={CATEGORY_OPTIONS}
          onChange={(value) => onChange({ category: value })}
        />
        <Select
          className="toolbar__stock"
          label="Stock"
          value={stock}
          options={STOCK_FILTERS}
          onChange={(value) => onChange({ stock: value })}
        />
        <Select
          className="toolbar__sort"
          label="Sort by"
          value={sort}
          options={SORT_OPTIONS}
          onChange={(value) => onChange({ sort: value })}
        />
      </div>

      {chips.length > 0 && (
        <ul className="filter-chips" aria-label="Active filters">
          {chips.map((chip) => (
            <li key={chip.key}>
              <button type="button" className="filter-chip" onClick={() => onChange({ [chip.key]: 'all' })}>
                {chip.label}
                <Icon name="x" size={12} strokeWidth={2.5} />
                <span className="visually-hidden">(remove filter)</span>
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="link-button filter-chips__clear" onClick={onClearAll}>
              Clear all
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
