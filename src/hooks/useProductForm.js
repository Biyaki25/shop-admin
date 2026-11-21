import { useMemo, useState } from 'react'
import { REQUIRED_FIELDS, validateProduct } from '../utils/validation.js'

/** Empty values for the Add product form. Numbers are kept as strings while editing. */
export const EMPTY_PRODUCT_VALUES = {
  name: '',
  price: '',
  stock: '',
  category: '',
  description: '',
  imageUrl: '',
}

/** Convert a stored product into form values (strings). */
export function productToValues(product) {
  return {
    name: product.name,
    price: product.price.toFixed(2),
    stock: String(product.stock),
    category: product.category,
    description: product.description ?? '',
    imageUrl: product.imageUrl ?? '',
  }
}

/** True when two form values mean the same thing ("129" and "129.00" are equal prices). */
function sameValue(field, a, b) {
  if (field === 'price' || field === 'stock') {
    const x = String(a).trim()
    const y = String(b).trim()
    if (x === '' || y === '') return x === y
    return Number(x) === Number(y)
  }
  return String(a).trim() === String(b).trim()
}

/**
 * Form state + validation for the Add and Edit product pages.
 *
 * Errors are calculated on every change, but only *shown* for a field once
 * the user has left it (blur) or tried to submit, so people aren't scolded
 * while they're still typing. After that, errors update live as they fix them.
 */
export function useProductForm(initialValues) {
  // The values the form started from: "changed" is measured against these.
  const [baseline, setBaseline] = useState(initialValues)
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validateProduct(values), [values])

  // Only the errors the user should see right now.
  const visibleErrors = useMemo(() => {
    const shown = {}
    for (const [field, message] of Object.entries(errors)) {
      if (submitted || touched[field]) shown[field] = message
    }
    return shown
  }, [errors, submitted, touched])

  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }))
  const touch = (field) => setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }))

  /** Mark the form as submitted; returns true when every field is valid. */
  const attemptSubmit = () => {
    setSubmitted(true)
    return Object.keys(errors).length === 0
  }

  /** Start over from `next` (default: the original values), which becomes the new baseline. */
  const reset = (next = baseline) => {
    setBaseline(next)
    setValues(next)
    setTouched({})
    setSubmitted(false)
  }

  // Fields that differ from where the form started (drives the amber dots
  // and the "You have unsaved changes" bar on the Edit page).
  const changed = useMemo(() => {
    const result = {}
    for (const field of Object.keys(baseline)) {
      if (!sameValue(field, values[field], baseline[field])) result[field] = true
    }
    return result
  }, [values, baseline])
  const hasChanges = Object.keys(changed).length > 0

  const isDirty = Object.values(values).some((v) => String(v).trim() !== '')
  const requiredComplete = REQUIRED_FIELDS.every((f) => !errors[f])

  return {
    values,
    errors,
    visibleErrors,
    submitted,
    isDirty,
    requiredComplete,
    changed,
    hasChanges,
    setField,
    touch,
    attemptSubmit,
    reset,
  }
}
