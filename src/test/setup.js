import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { latency } from '../data/productStore.js'

// No fake network delay in tests, and a fresh catalog for every test.
latency.read = 0
latency.write = 0

beforeEach(() => localStorage.clear())
afterEach(() => cleanup())
