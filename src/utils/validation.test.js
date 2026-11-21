import { describe, expect, it } from 'vitest'
import { MESSAGES, validateProduct } from './validation.js'

const valid = {
  name: 'Travel headphones',
  price: '159.00',
  stock: '16',
  category: 'Electronics',
  description: '',
  imageUrl: '',
}

describe('validateProduct', () => {
  it('accepts a complete product without an image', () => {
    expect(validateProduct(valid)).toEqual({})
  })

  it('flags the four errors shown in the mock-up', () => {
    const errors = validateProduct({ ...valid, name: '  ', price: '-5.00', stock: '-3', category: '' })
    expect(errors).toEqual({
      name: MESSAGES.name,
      price: MESSAGES.price,
      stock: MESSAGES.stock,
      category: MESSAGES.category,
    })
  })

  it.each(['', '0', '0.00', 'abc', '-1'])('rejects price %j', (price) => {
    expect(validateProduct({ ...valid, price }).price).toBe(MESSAGES.price)
  })

  it.each(['1.5', '', 'ten'])('rejects stock %j', (stock) => {
    expect(validateProduct({ ...valid, stock }).stock).toBe(MESSAGES.stock)
  })

  it('allows zero stock', () => {
    expect(validateProduct({ ...valid, stock: '0' }).stock).toBeUndefined()
  })

  it.each([
    ['not-a-valid-url', false],
    ['http://example.com/a.jpg', false],
    ['https://cdn.shopadmin.co/travel.jpg', true],
    ['/products/studio-headphones.jpg', true],
  ])('image URL %j valid=%s', (imageUrl, ok) => {
    expect(Boolean(validateProduct({ ...valid, imageUrl }).imageUrl)).toBe(!ok)
  })
})
