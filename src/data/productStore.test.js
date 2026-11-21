import { describe, expect, it } from 'vitest'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  restoreProduct,
  STORAGE_KEY,
  updateProduct,
} from './productStore.js'

const input = {
  name: ' Travel headphones ',
  price: '159',
  stock: '16',
  category: 'Electronics',
  description: 'Light and comfy.',
  imageUrl: '',
}

describe('productStore', () => {
  it('seeds the 8 sample products into localStorage on first run', async () => {
    const products = await getProducts()
    expect(products).toHaveLength(8)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toHaveLength(8)
  })

  it('creates a product with a cleaned-up record and the next SKU', async () => {
    const product = await createProduct(input)
    expect(product).toMatchObject({ name: 'Travel headphones', price: 159, stock: 16, sku: 'SA-EL-003' })
    expect(await getProducts()).toHaveLength(9)
  })

  it('updates a product and keeps the change after a "refresh"', async () => {
    await updateProduct('1', { ...input, name: 'Studio headphones Pro', price: '139.5' })
    const reloaded = await getProduct('1')
    expect(reloaded).toMatchObject({ name: 'Studio headphones Pro', price: 139.5, sku: 'SA-EL-001' })
  })

  it('deletes and restores a product in its original position', async () => {
    const { product, index } = await deleteProduct('3')
    expect(await getProduct('3')).toBeNull()
    await restoreProduct(product, index)
    expect((await getProducts())[index].id).toBe('3')
  })

  it('reports corrupt storage as an error', async () => {
    localStorage.setItem(STORAGE_KEY, '{oops')
    await expect(getProducts()).rejects.toThrow()
  })
})
