import { useEffect, useState } from 'react'
import { getProduct } from '../data/productStore.js'

/**
 * Load one product by id.
 * Returns { status: 'loading' | 'ready' | 'missing' | 'error', product }.
 *
 * The result is tagged with the id it belongs to, so when the URL changes to
 * another product we report 'loading' straight away instead of briefly
 * showing the previous product.
 */
export function useProduct(id) {
  const [result, setResult] = useState({ id: null, status: 'loading', product: null })

  useEffect(() => {
    let active = true
    getProduct(id)
      .then((product) => {
        if (active) setResult({ id, status: product ? 'ready' : 'missing', product })
      })
      .catch(() => {
        if (active) setResult({ id, status: 'error', product: null })
      })
    return () => {
      active = false
    }
  }, [id])

  return result.id === id ? result : { status: 'loading', product: null }
}
