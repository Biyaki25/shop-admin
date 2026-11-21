import { describe, expect, it } from 'vitest'
import { SEED_PRODUCTS } from '../data/seedProducts.js'
import { countByStock, filterProducts } from './filterProducts.js'

const names = (list) => list.map((p) => p.name)

describe('filterProducts', () => {
  it('sorts by name A-Z by default', () => {
    expect(names(filterProducts(SEED_PRODUCTS)).slice(0, 2)).toEqual(['Analog timepiece', 'Arc desk lamp'])
  })

  it('matches name and category, case-insensitively ("ea" example from the mock-up)', () => {
    expect(names(filterProducts(SEED_PRODUCTS, { query: 'EA' }))).toEqual([
      'Essential sneakers',
      'Portable speaker',
      'Studio headphones',
    ])
  })

  it('matches on category text', () => {
    expect(filterProducts(SEED_PRODUCTS, { query: 'home & living' })).toHaveLength(2)
  })

  it('returns nothing for "zzzz"', () => {
    expect(filterProducts(SEED_PRODUCTS, { query: 'zzzz' })).toEqual([])
  })

  it('combines category and stock filters (Electronics + In stock)', () => {
    expect(names(filterProducts(SEED_PRODUCTS, { category: 'Electronics', stock: 'in' }))).toEqual([
      'Portable speaker',
      'Studio headphones',
    ])
  })

  it('sorts by price high to low', () => {
    expect(filterProducts(SEED_PRODUCTS, { sort: 'price-desc' })[0].name).toBe('Analog timepiece')
  })
})

describe('countByStock', () => {
  it('matches the summary cards in the mock-up', () => {
    expect(countByStock(SEED_PRODUCTS)).toEqual({ total: 8, in: 6, low: 1, out: 1 })
  })
})
