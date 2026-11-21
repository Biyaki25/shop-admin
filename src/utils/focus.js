/** Field order used to decide which invalid field gets focus first. */
const FIELD_ORDER = ['name', 'price', 'stock', 'category', 'description', 'imageUrl']

/**
 * After a failed submit, move keyboard focus to the first invalid field so
 * the user lands right where the problem is (its error is read out too,
 * because the input is linked to it with aria-describedby).
 */
export function focusFirstError(errors, idPrefix) {
  const first = FIELD_ORDER.find((field) => errors[field])
  if (first) document.getElementById(`${idPrefix}-${first}`)?.focus()
}
