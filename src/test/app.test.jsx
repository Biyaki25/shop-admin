/**
 * End-to-end style tests: render the real app at a URL and use it the way an
 * admin would (typing, clicking), checking what appears on screen.
 */
import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '../routes.jsx'

function renderAt(url) {
  const user = userEvent.setup()
  const router = createMemoryRouter(routes, { initialEntries: [url] })
  render(<RouterProvider router={router} />)
  return user
}

describe('Products page', () => {
  it('filters as you type and shows "No products found"', async () => {
    const user = renderAt('/products')
    expect(await screen.findByRole('link', { name: 'Studio headphones' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(8)

    const search = screen.getByRole('searchbox', { name: /search products/i })
    await user.type(search, 'ea')
    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.getByText('Showing 3 of 8 products')).toBeInTheDocument()

    await user.clear(search)
    await user.type(search, 'zzzz')
    expect(screen.getByRole('heading', { name: 'No products found' })).toBeInTheDocument()
    expect(screen.getByText(/couldn’t find a match for “zzzz”/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(screen.getAllByRole('article')).toHaveLength(8)
  })

  it('filters by category with the custom dropdown', async () => {
    const user = renderAt('/products')
    await screen.findAllByRole('article')
    await user.click(screen.getByRole('combobox', { name: 'Category' }))
    await user.click(screen.getByRole('option', { name: 'Footwear' }))
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('button', { name: /Category: Footwear/ })).toBeInTheDocument()
  })
})

describe('Add product', () => {
  it('shows clear errors for invalid input', async () => {
    const user = renderAt('/products/new')
    await user.type(screen.getByLabelText(/Price/), '-5')
    await user.type(screen.getByLabelText(/Stock/), '-3')
    await user.click(screen.getByRole('button', { name: 'Add Product' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Please check the 4 highlighted fields.')
    expect(screen.getByLabelText(/Product name/)).toHaveAccessibleDescription('Enter a product name.')
    expect(screen.getByLabelText(/Price/)).toHaveAccessibleDescription('Enter a price greater than 0.')
    expect(screen.getByText('Use a whole number, 0 or more.')).toBeInTheDocument()
    expect(screen.getByText('Choose a category.')).toBeInTheDocument()
    // Focus jumps to the first problem.
    expect(screen.getByLabelText(/Product name/)).toHaveFocus()
  })

  it('adds a product that then appears in the catalog', async () => {
    const user = renderAt('/products/new')
    await user.type(screen.getByLabelText(/Product name/), 'Travel headphones')
    await user.type(screen.getByLabelText(/Price/), '159')
    await user.type(screen.getByLabelText(/Stock/), '16')
    await user.selectOptions(screen.getByLabelText(/Category/), 'Electronics')
    await user.click(screen.getByRole('button', { name: 'Add Product' }))

    expect(await screen.findByText('Travel headphones added successfully.')).toBeInTheDocument()
    // The form's own button (the top "← Back to products" link is the other match).
    await user.click(screen.getAllByRole('link', { name: 'Back to products' }).at(-1))
    expect(await screen.findByRole('link', { name: 'Travel headphones' })).toBeInTheDocument()
    expect(screen.getByText('Showing 9 products')).toBeInTheDocument()
  })
})

describe('Edit and delete', () => {
  it('saves edits and shows them on the details page straight away', async () => {
    const user = renderAt('/products/1/edit')
    const price = await screen.findByLabelText(/Price/)
    await user.clear(price)
    await user.type(price, '99.5')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(await screen.findByText('Product saved successfully.')).toBeInTheDocument()
    expect(screen.getByText('$99.50')).toBeInTheDocument()
  })

  it('asks before deleting, then offers Undo', async () => {
    const user = renderAt('/products/1')
    await user.click(await screen.findByRole('button', { name: 'Delete product' }))
    const dialog = screen.getByRole('dialog', { name: 'Delete this product?' })
    await user.click(within(dialog).getByRole('button', { name: 'Delete product' }))

    expect(await screen.findByText('Studio headphones deleted.')).toBeInTheDocument()
    expect(await screen.findByText('Showing 7 products')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Undo' }))
    expect(await screen.findByText('Showing 8 products')).toBeInTheDocument()
  })

  it('shows "Product not found" for an unknown id', async () => {
    renderAt('/products/does-not-exist')
    expect(await screen.findByRole('heading', { name: 'Product not found' })).toBeInTheDocument()
  })
})

describe('Dashboard', () => {
  it('summarizes the catalog and lists products that need restocking', async () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument()

    const kpis = await screen.findByRole('region', { name: 'Key figures' })
    expect(await within(kpis).findByText('8')).toBeInTheDocument() // total products
    expect(within(kpis).getByText('1 low · 1 out')).toBeInTheDocument()

    const restock = screen.getByRole('region', { name: 'Needs restocking' })
    const links = within(restock).getAllByRole('link', { name: /^Restock / })
    // Emptiest first: the out-of-stock watch, then the low-stock lamp.
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Restock Analog timepiece',
      'Restock Arc desk lamp',
    ])

    const recent = screen.getByRole('region', { name: 'Recently updated' })
    expect(within(recent).getAllByRole('row')).toHaveLength(6) // header + 5 products
  })
})

it('shows the 404 page for unknown URLs', () => {
  renderAt('/nope')
  expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
})

describe('Dark mode toggle', () => {
  it('switches modes, updates the sun/moon state and remembers the choice', async () => {
    document.documentElement.dataset.theme = 'light'
    const user = renderAt('/')
    const toggle = screen.getByRole('button', { name: 'Dark mode' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await user.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(localStorage.getItem('shopadmin.theme')).toBe('dark')

    await user.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})

describe('Unsaved changes on Edit', () => {
  it('marks changed fields, shows the sticky bar, and Discard restores the values', async () => {
    const user = renderAt('/products/1/edit')
    const name = await screen.findByLabelText(/Product name/)
    expect(screen.queryByRole('region', { name: 'Unsaved changes' })).not.toBeInTheDocument()

    await user.type(name, ' Pro')
    const bar = screen.getByRole('region', { name: 'Unsaved changes' })
    expect(bar).toHaveTextContent('You have unsaved changes')
    expect(screen.getByText('(changed)')).toBeInTheDocument() // the amber dot on "Product name"

    await user.click(within(bar).getByRole('button', { name: 'Discard' }))
    expect(name).toHaveValue('Studio headphones')
    expect(screen.queryByRole('region', { name: 'Unsaved changes' })).not.toBeInTheDocument()
  })

  it('asks "Leave without saving?" before navigating away', async () => {
    const user = renderAt('/products/1/edit')
    await user.type(await screen.findByLabelText(/Stock/), '0')
    await user.click(screen.getByRole('link', { name: 'Dashboard' }))

    const dialog = screen.getByRole('dialog', { name: 'Leave without saving?' })
    expect(dialog).toHaveTextContent('Your changes will be lost.')
    expect(within(dialog).getByRole('button', { name: 'Keep editing' })).toHaveFocus()

    await user.click(within(dialog).getByRole('button', { name: 'Keep editing' }))
    expect(screen.getByLabelText(/Stock/)).toHaveValue(240)

    await user.click(screen.getByRole('link', { name: 'Dashboard' }))
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Leave page' }))
    expect(await screen.findByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument()
  })

  it('saves from the sticky bar without asking', async () => {
    const user = renderAt('/products/1/edit')
    const price = await screen.findByLabelText(/Price/)
    await user.clear(price)
    await user.type(price, '119')
    const bar = screen.getByRole('region', { name: 'Unsaved changes' })
    await user.click(within(bar).getByRole('button', { name: 'Save changes' }))
    expect(await screen.findByText('Product saved successfully.')).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('Add product draft', () => {
  it('autosaves a draft and restores it after leaving the page', async () => {
    const user = renderAt('/products/new')
    await user.type(screen.getByLabelText(/Product name/), 'Travel headphones')
    expect(await screen.findByText(/Draft saved just now/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('shopadmin.addProductDraft')).values.name).toBe('Travel headphones')
  })

  it('starts from a saved draft', async () => {
    localStorage.setItem(
      'shopadmin.addProductDraft',
      JSON.stringify({ values: { name: 'Draft lamp' }, savedAt: Date.now() - 3 * 60 * 1000 }),
    )
    renderAt('/products/new')
    expect(screen.getByLabelText(/Product name/)).toHaveValue('Draft lamp')
    expect(await screen.findByText(/Draft saved 3 minutes ago/)).toBeInTheDocument()
  })
})

it('shows all six form field states', () => {
  renderAt('/components/form-fields')
  for (const title of ['Default', 'Focus', 'Filled', 'Error', 'Disabled', 'Read-only']) {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
  }
  expect(screen.getByDisplayValue('SA-EL-001')).toHaveAttribute('readonly')
})
