import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { latency } from '../data/productStore.js'

// No fake network delay in tests, and a fresh catalog for every test.
latency.read = 0
latency.write = 0

// jsdom doesn't implement window.scrollTo (Layout calls it on every route
// change), so it logged "Not implemented" warnings. Stub it.
window.scrollTo = vi.fn()

beforeEach(() => localStorage.clear())
afterEach(() => cleanup())
