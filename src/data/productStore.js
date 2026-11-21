/**
 * Product store backed by localStorage.
 *
 * All functions are async on purpose: the pages are written the same way they
 * would be against a real API, so the loading, saving and error states in the
 * mock-up (skeletons, "Saving…" spinner, "Couldn't load products") all work.
 * A short artificial delay makes those states visible.
 *
 * Demo helper: add `?simulate=error` to the products page URL to see the
 * "Couldn't load products" state.
 */
import { CATEGORY_CODES } from './catalog.js'
import { SEED_PRODUCTS } from './seedProducts.js'

export const STORAGE_KEY = 'shopadmin.products.v1'

/** Milliseconds of fake network latency. Set to 0 in tests. */
export const latency = { read: 350, write: 600 }

const wait = (ms) => (ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve())

function shouldSimulateError() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('simulate') === 'error'
}

/**
 * Read every product from localStorage, seeding the 8 sample products the
 * first time. Throws if storage is unavailable or the data is corrupt, which
 * the products page turns into its error state.
 */
function readAll() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) {
    writeAll(SEED_PRODUCTS)
    return structuredClone(SEED_PRODUCTS)
  }
  const data = JSON.parse(raw)
  if (!Array.isArray(data)) throw new Error('Stored catalog is not a list')
  return data
}

function writeAll(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

/**
 * Build the next SKU for a category: SA-<code>-<3-digit number>.
 * Uses the highest existing number for that code so SKUs never repeat,
 * even after deletes.
 */
export function nextSku(products, category) {
  const code = CATEGORY_CODES[category] ?? 'GN'
  const prefix = `SA-${code}-`
  const highest = products
    .filter((p) => p.sku?.startsWith(prefix))
    .reduce((max, p) => Math.max(max, Number(p.sku.slice(prefix.length)) || 0), 0)
  return `${prefix}${String(highest + 1).padStart(3, '0')}`
}

/** Turn form values (strings) into a clean product record. */
function normalize(input) {
  return {
    name: input.name.trim(),
    description: input.description?.trim() ?? '',
    price: Math.round(Number(input.price) * 100) / 100,
    stock: Number.parseInt(input.stock, 10),
    category: input.category,
    imageUrl: input.imageUrl?.trim() ?? '',
  }
}

/* ---------- Public API ---------- */

export async function getProducts() {
  await wait(latency.read)
  if (shouldSimulateError()) throw new Error('Simulated network error')
  return readAll()
}

/** Returns the product, or null when no product has that id. */
export async function getProduct(id) {
  await wait(latency.read)
  return readAll().find((p) => p.id === id) ?? null
}

export async function createProduct(input) {
  await wait(latency.write)
  const products = readAll()
  const product = {
    id: String(Date.now()),
    sku: nextSku(products, input.category),
    ...normalize(input),
    updatedAt: new Date().toISOString(),
  }
  writeAll([...products, product])
  return product
}

export async function updateProduct(id, input) {
  await wait(latency.write)
  const products = readAll()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) throw new Error('Product not found')
  const updated = { ...products[index], ...normalize(input), updatedAt: new Date().toISOString() }
  products[index] = updated
  writeAll(products)
  return updated
}

/**
 * Remove a product. Returns the removed product and its position so the
 * "Undo" button on the products page can put it back exactly where it was.
 */
export async function deleteProduct(id) {
  await wait(latency.write)
  const products = readAll()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) throw new Error('Product not found')
  const [product] = products.splice(index, 1)
  writeAll(products)
  return { product, index }
}

/** Undo a delete by re-inserting the product at its original position. */
export async function restoreProduct(product, index) {
  const products = readAll()
  if (products.some((p) => p.id === product.id)) return product
  products.splice(Math.min(index, products.length), 0, product)
  writeAll(products)
  return product
}
