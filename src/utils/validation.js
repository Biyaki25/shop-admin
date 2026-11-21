/**
 * Product form validation. Error messages are word-for-word from the mock-up.
 * Returns an object of { fieldName: message } containing only invalid fields.
 */

export const MESSAGES = {
  name: 'Enter a product name.',
  nameTooLong: 'Keep the name under 120 characters.',
  price: 'Enter a price greater than 0.',
  stock: 'Use a whole number, 0 or more.',
  category: 'Choose a category.',
  imageUrl: 'Enter a valid image URL, starting with https://.',
}

/**
 * An image URL is valid when it is a full https:// address, or a path on this
 * site (the sample products use /products/<name>.jpg).
 */
export function isValidImageUrl(value) {
  const url = value.trim()
  if (url.startsWith('/') && !url.startsWith('//')) return true
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' && parsed.hostname.includes('.')
  } catch {
    return false
  }
}

export function validateProduct(values) {
  const errors = {}

  const name = values.name.trim()
  if (!name) errors.name = MESSAGES.name
  else if (name.length > 120) errors.name = MESSAGES.nameTooLong

  // Price must be a positive number (blank, 0, negatives and text all fail).
  const priceText = String(values.price).trim()
  const price = Number(priceText)
  if (priceText === '' || !Number.isFinite(price) || price <= 0) errors.price = MESSAGES.price

  // Stock must be a whole number, 0 or more (no decimals, no negatives).
  if (!/^\d+$/.test(String(values.stock).trim())) errors.stock = MESSAGES.stock

  if (!values.category) errors.category = MESSAGES.category

  // Image URL is optional, but if given it must look like a real URL.
  if (values.imageUrl.trim() && !isValidImageUrl(values.imageUrl)) errors.imageUrl = MESSAGES.imageUrl

  return errors
}

/** The fields that make a product "ready" before the optional image. */
export const REQUIRED_FIELDS = ['name', 'price', 'stock', 'category']
