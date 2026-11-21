import { useEffect, useRef, useState } from 'react'

const AUTOSAVE_DELAY = 600 // ms after the last keystroke
const CLOCK_TICK = 15000 // refresh "2 minutes ago" every 15 s

function readDraft(key) {
  try {
    const draft = JSON.parse(localStorage.getItem(key))
    if (draft && typeof draft.values === 'object' && typeof draft.savedAt === 'number') return draft
  } catch {
    // missing, corrupt or blocked storage: start with no draft
  }
  return null
}

/**
 * Autosave form values to localStorage as a draft.
 *
 * - `initialDraft` is read once, so the page can start the form from it.
 * - While `enabled`, values are saved shortly after the user stops typing.
 *   An all-empty form removes the draft instead.
 * - `savedAt` / `now` drive the "Draft saved just now" caption.
 */
export function useDraft(key, values, { enabled = true, isEmpty } = {}) {
  const [initialDraft] = useState(() => readDraft(key))
  const [savedAt, setSavedAt] = useState(initialDraft?.savedAt ?? null)
  const [now, setNow] = useState(() => initialDraft?.savedAt ?? 0)
  // What's in storage right now, so unchanged values aren't re-saved.
  const lastSaved = useRef(initialDraft ? JSON.stringify(initialDraft.values) : '')

  // Debounced autosave.
  useEffect(() => {
    if (!enabled) return
    const timer = setTimeout(() => {
      const serialized = JSON.stringify(values)
      if (serialized === lastSaved.current) return
      try {
        if (isEmpty(values)) {
          localStorage.removeItem(key)
          lastSaved.current = ''
          setSavedAt(null)
        } else {
          const at = Date.now()
          localStorage.setItem(key, JSON.stringify({ values, savedAt: at }))
          lastSaved.current = serialized
          setSavedAt(at)
          setNow(at)
        }
      } catch {
        // Storage full or blocked: drafts are a convenience, so fail quietly.
      }
    }, AUTOSAVE_DELAY)
    return () => clearTimeout(timer)
  }, [key, values, enabled, isEmpty])

  // Keep the relative time fresh while a draft exists.
  useEffect(() => {
    if (!savedAt) return
    const tick = () => setNow(Date.now())
    const first = setTimeout(tick, 0)
    const id = setInterval(tick, CLOCK_TICK)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [savedAt])

  /** Delete the draft (after a successful add, or "Discard draft"). */
  const clearDraft = () => {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
    lastSaved.current = ''
    setSavedAt(null)
  }

  return { initialDraft, savedAt, now, clearDraft }
}
