# ShopAdmin

An administrator portal for an e-commerce store. Admins can browse the product
catalog, search and filter it, add new products, edit and delete existing ones,
and switch between light and dark mode. It is built from the Figma mock-ups in
[`design/`](design/) and works on phones, tablets and desktops.

All data is kept in the browser's `localStorage`, so there is no server or
database to set up. The catalog starts with 8 sample products.

---

## Contents

1. [Quick start](#quick-start)
2. [Features](#features)
3. [Pages and URLs](#pages-and-urls)
4. [How to use it](#how-to-use-it)
5. [Tech stack](#tech-stack)
6. [Project structure](#project-structure)
7. [How it works](#how-it-works)
8. [Design system and theming](#design-system-and-theming)
9. [Responsive design](#responsive-design)
10. [Accessibility](#accessibility)
11. [Testing](#testing)
12. [Data and browser storage](#data-and-browser-storage)
13. [Customising](#customising)
14. [Design decisions and assumptions](#design-decisions-and-assumptions)
15. [Troubleshooting](#troubleshooting)
16. [Screenshots](#screenshots)
17. [Team](#team)
18. [AI tools used](#ai-tools-used)

---

## Quick start

**Requirements:** [Node.js](https://nodejs.org/) 22.12 or newer (Vite needs
20.19+, Vitest needs 22.12+) and npm.

```bash
npm install        # install dependencies (only needed once)
npm run dev        # start the dev server, then open http://localhost:5173
```

| Command              | What it does                                                    |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Start the development server with hot reload                    |
| `npm run build`      | Create an optimised production build in `dist/`                 |
| `npm run preview`    | Serve the production build locally to check it                  |
| `npm test`           | Run all tests once                                              |
| `npm run test:watch` | Re-run tests automatically as you edit                          |
| `npm run lint`       | Check the code with ESLint                                      |

There is no `npm run api` and no `db.json`: products are stored in the
browser's `localStorage` (see [Data and browser storage](#data-and-browser-storage)),
so `npm install` followed by `npm run dev` is all you need after a fresh clone.

---

## Features

### Catalog
- **Dashboard** home page: key figures, stock status, products per category,
  items that need restocking and recently updated products.
- **Sidebar navigation** (Dashboard, Products, Add Product and the component
  reference pages) with a top bar holding the page title and theme toggle.
- **Products page** with four summary cards (Total, In stock, Low stock, Out of
  stock) and a responsive grid of product cards.
- **Stock badges**: green "In stock · 24", amber "Low stock · 3", red "Out of
  stock". Out-of-stock photos are shown faded and grey.

### Search, filter and sort
- **Live search** on product name and category. Results update on every
  keystroke, with no page reload.
- **Filters** for Category and Stock level, and **Sort by** (name, price,
  stock, recently updated).
- **Filter chips** ("Category: Electronics ×") with a "Clear all" link.
- **"No products found"** message that repeats what you searched for.
- Search and filters are stored in the URL (for example
  `/products?q=lamp&category=Home+%26+living`), so they survive a refresh and
  the Back button returns to the same view.
- Press <kbd>/</kbd> anywhere to jump to the search box, <kbd>Esc</kbd> to
  clear it.

### Add a product
- Fields: name, price, stock, category, description and image URL.
- **Validation** with clear messages under each field and a summary at the top
  ("Please check the 4 highlighted fields."). Focus jumps to the first problem.
- **Live image preview** with "No image yet" and "Image unavailable" states.
- **Draft autosave**: the form saves itself as you type ("Draft saved just
  now"), so a refresh doesn't lose your work. "Discard draft" clears it.
- After saving: a success message, plus "Back to products" and "Add another
  product" buttons.

### Product details
- Large photo, category, name, SKU, price, stock status, description and
  "Last updated" date.
- **Edit** and **Delete** buttons.

### Edit a product
- Same fields as Add, plus a read-only SKU.
- The large photo updates live as you change the image URL.
- **Unsaved changes**: each changed field gets a small amber dot, and a bar
  sticks to the bottom of the screen with "You have unsaved changes",
  **Discard** and **Save changes**.
- **"Leave without saving?"** dialog if you try to navigate away with unsaved
  changes. Closing the tab shows the browser's own warning.
- Saving returns you to the details page with "Product saved successfully."
  and the new values shown straight away.

### Delete with Undo
- A confirmation dialog: "Delete this product?".
- After deleting, a toast says "Studio headphones deleted." with an **Undo**
  button and a thin bar counting down 5 seconds. Hovering over it or focusing
  Undo pauses the countdown.

### Light and dark mode
- A sun/moon toggle in the top bar. The choice is remembered; until you pick
  one, the app follows your operating system setting.
- Every colour comes from design tokens with a Light and a Dark mode, and all
  text meets WCAG AA contrast (4.5:1) in both.
- Product photos are dimmed to 90% in dark mode so they don't glare.

### States from the mock-ups
- Loading placeholders (shimmering skeleton cards).
- "Couldn't load products" with a "Try again" button.
- "Product not found" for a bad product link, and a "Page not found" (404)
  page.
- A **form field states** reference page showing the input in its Default,
  Focus, Filled, Error, Disabled and Read-only variants.
- A **buttons** reference page showing every button style and size, using the
  same CSS classes as the live app.

---

## Pages and URLs

| URL                       | Page                                                      |
| ------------------------- | --------------------------------------------------------- |
| `/`                       | Dashboard                                                 |
| `/products`               | Product list with search, filters and sorting             |
| `/products/new`           | Add product form                                          |
| `/products/:id`           | Product details (for example `/products/1`)               |
| `/products/:id/edit`      | Edit product form                                         |
| `/components/form-fields` | Form field states reference sheet                         |
| `/components/buttons`     | Button styles reference sheet                             |
| anything else             | 404 "Page not found"                                      |

**Products page URL parameters**

| Parameter  | Values                                                                 | Default    |
| ---------- | ---------------------------------------------------------------------- | ---------- |
| `q`        | Any search text                                                        | empty      |
| `category` | `Electronics`, `Accessories`, `Home & living`, `Footwear`, `Lifestyle` | all        |
| `stock`    | `in`, `low`, `out`                                                     | all        |
| `sort`     | `name-asc`, `name-desc`, `price-asc`, `price-desc`, `stock-asc`, `newest` | `name-asc` |
| `simulate` | `error` (demo only: shows the "Couldn't load products" state)          | off        |

---

## How to use it

1. **Find a product.** Go to **Products**, type in the search box, or pick a
   Category / Stock filter. Click a card to open it.
2. **Add a product.** Click **+ Add Product**, fill in the required fields
   (marked `*`) and click **Add Product**. Image URL and description are
   optional.
3. **Edit a product.** Open it and click **Edit product**. Change any field;
   an amber dot marks what you changed. Click **Save changes** in the bar at
   the bottom, or **Discard** to undo your edits.
4. **Delete a product.** Open it, click **Delete product** and confirm. Click
   **Undo** in the toast within 5 seconds to bring it back.
5. **Switch theme.** Click the moon (light mode) or sun (dark mode) icon at the
   top right.

### Validation rules

| Field       | Rule                                                    | Error message                                        |
| ----------- | ------------------------------------------------------- | ---------------------------------------------------- |
| Name        | Required, up to 120 characters                          | "Enter a product name."                              |
| Price       | Required, a number greater than 0                       | "Enter a price greater than 0."                      |
| Stock       | Required, a whole number, 0 or more                     | "Use a whole number, 0 or more."                     |
| Category    | Required                                                | "Choose a category."                                 |
| Image URL   | Optional; a full `https://` URL or a site path like `/products/x.jpg` | "Enter a valid image URL, starting with https://." |
| Description | Optional, up to 1000 characters                         | none                                                 |

Errors appear once you leave a field or press submit, then update live as you
fix them. A valid price is tidied to two decimals when you leave the field
(`129` becomes `129.00`).

---

## Tech stack

Versions are the ones installed from `package-lock.json` (`npm ls --depth=0`).

| Tool                                                      | Version  | Used for                                          |
| --------------------------------------------------------- | -------- | ------------------------------------------------- |
| [React](https://react.dev/) + React DOM                   | 19.3.1   | User interface components                         |
| [React Router](https://reactrouter.com/) (`react-router-dom`) | 7.18.5 | Pages, URLs, and the "leave without saving" guard |
| [Vite](https://vite.dev/) + `@vitejs/plugin-react`        | 8.3.8 / 6.3.0 | Dev server and production build              |
| Plain CSS with custom properties                          | –        | Styling and light/dark design tokens              |
| [Vitest](https://vitest.dev/)                             | 5.1.0    | Test runner                                       |
| [Testing Library](https://testing-library.com/) (react / user-event / jest-dom) | 16.3.3 / 14.6.12 / 7.0.1 | Rendering and using components in tests |
| jsdom                                                     | 31.0.1   | Browser environment for tests                     |
| [ESLint](https://eslint.org/)                             | 10.15.0  | Code quality checks                               |
| [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts | – | Typeface from the mock-ups               |
| `localStorage`                                            | –        | Saving products, drafts and the theme choice      |

There are no UI or CSS frameworks: every component and style is in this
repository. Icons are small inline SVGs in `src/components/ui/Icon.jsx`.

`json-server` is listed in `package.json` from the original project setup but
is not used.

---

## Project structure

```
shop-admin/
├── design/                      Figma PDF exports (the source mock-ups)
├── index.html                   Page shell; loads Inter and sets the theme before first paint
├── public/
│   ├── favicon.svg
│   └── products/                The 8 sample product photos
├── src/
│   ├── main.jsx                 Entry point: global CSS + router
│   ├── routes.jsx               Route table (every URL → page)
│   │
│   ├── pages/                   One file per screen
│   │   ├── Dashboard.jsx/.css        (home page, `/`)
│   │   ├── Products.jsx/.css
│   │   ├── ProductDetails.jsx/.css   (its layout is shared with Edit)
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── ProductFormPage.css       (Add page layout and banners)
│   │   ├── ProductNotFound.jsx
│   │   ├── NotFound.jsx
│   │   ├── FieldStates.jsx/.css      (form field states sheet)
│   │   └── ButtonStates.jsx/.css     (button styles sheet)
│   │
│   ├── components/
│   │   ├── layout/              Shared on every page
│   │   │   ├── Layout.jsx/.css       Sidebar + top bar + page + footer, skip link
│   │   │   ├── Sidebar.jsx/.css      Logo and navigation; a drawer on small screens
│   │   │   ├── Topbar.jsx/.css       Menu button, page title, theme toggle
│   │   │   ├── ThemeToggle.jsx       Sun/moon button
│   │   │   └── Footer.jsx/.css
│   │   ├── products/            Product-specific pieces
│   │   │   ├── ProductCard.jsx/.css  Grid card + loading skeleton
│   │   │   ├── ProductImage.jsx/.css Photo with fallback placeholder
│   │   │   ├── StockBadge.jsx/.css
│   │   │   ├── StatCards.jsx/.css    Total / In / Low / Out summary
│   │   │   ├── ProductToolbar.jsx/.css  Search, dropdowns, filter chips
│   │   │   ├── ProductFormFields.jsx    Fields shared by Add and Edit
│   │   │   ├── ProductForm.css          Form card, preview, tips, draft caption
│   │   │   ├── ImagePreview.jsx
│   │   │   ├── ProductTips.jsx          "Make every product shine." panel
│   │   │   └── UnsavedChangesBar.jsx/.css
│   │   └── ui/                  Generic building blocks
│   │       ├── Alert.jsx/.css        Success / error banners
│   │       ├── Toast.jsx/.css        Countdown toast
│   │       ├── ConfirmDialog.jsx/.css  Delete and leave-page dialogs
│   │       ├── Select.jsx/.css       Accessible custom dropdown
│   │       ├── StatusCard.jsx/.css   Empty, error and not-found cards
│   │       ├── BackLink.jsx
│   │       └── Icon.jsx
│   │
│   ├── data/
│   │   ├── catalog.js           Categories, SKU codes, stock threshold, sort options
│   │   ├── seedProducts.js      The 8 sample products
│   │   └── productStore.js      localStorage "API": get, create, update, delete, restore
│   │
│   ├── hooks/
│   │   ├── useProduct.js        Load one product by id
│   │   ├── useProductForm.js    Form values, validation, changed fields
│   │   ├── useDraft.js          Autosave the Add form
│   │   └── useTheme.js          Light/dark mode
│   │
│   ├── utils/
│   │   ├── validation.js        Form rules and error messages
│   │   ├── filterProducts.js    Search, filter, sort, stock counts
│   │   ├── format.js            Prices, dates, stock labels, "3 minutes ago"
│   │   └── focus.js             Focus the first invalid field
│   │
│   ├── styles/                  Global CSS, loaded in this order
│   │   ├── tokens.css           Design tokens (Light + Dark modes)
│   │   ├── base.css             Reset, typography, layout helpers, skeletons
│   │   ├── buttons.css
│   │   └── forms.css
│   │
│   └── test/
│       ├── setup.js             Test environment setup
│       └── app.test.jsx         Full user-flow tests
│
├── vite.config.js               Vite + Vitest configuration
└── eslint.config.js
```

Each component keeps its CSS in a file next to it. Unit tests sit next to the
code they test (`*.test.js`).

---

## How it works

### Routing
`src/routes.jsx` lists every page. `main.jsx` passes it to React Router's
`createBrowserRouter`. A "data router" is used (rather than `<BrowserRouter>`)
because the Edit page needs `useBlocker()` to show the "Leave without saving?"
dialog. All pages render inside `Layout`, which supplies the sidebar, top bar,
footer and "Skip to content" link.

### Data layer
`src/data/productStore.js` is the only code that touches product storage. It
exposes async functions that behave like a real API:

| Function                        | Returns                                     |
| ------------------------------- | ------------------------------------------- |
| `getProducts()`                 | All products (seeds the 8 samples on first run) |
| `getProduct(id)`                | One product, or `null`                      |
| `createProduct(values)`         | The new product, with an id and SKU          |
| `updateProduct(id, values)`     | The updated product                         |
| `deleteProduct(id)`             | `{ product, index }`, used for Undo         |
| `restoreProduct(product, index)`| Puts a deleted product back where it was    |

Because the pages already use `async` calls, the store can later be swapped
for real `fetch()` requests to a backend without changing the pages.

A small artificial delay (`latency = { read: 350, write: 600 }` milliseconds)
makes the loading skeletons and "saving" spinners visible. Tests set it to 0.

### Product records

```js
{
  id: '1',
  sku: 'SA-EL-001',            // generated: SA-<category code>-<number>
  name: 'Studio headphones',
  category: 'Electronics',
  price: 129,                  // number, 2 decimals
  stock: 24,                   // whole number
  imageUrl: '/products/studio-headphones.jpg',
  description: 'Premium wireless headphones…',
  updatedAt: '2026-11-17T10:00:00.000Z'
}
```

SKU codes: Electronics `EL`, Accessories `AC`, Home & living `HL`, Footwear
`FW`, Lifestyle `LS`. New SKUs continue from the highest existing number, so
they never repeat, even after a delete.

### Stock levels

| Stock      | Status       | Colour |
| ---------- | ------------ | ------ |
| 0          | Out of stock | Red    |
| 1 – 5      | Low stock    | Amber  |
| 6 or more  | In stock     | Green  |

The threshold is `LOW_STOCK_THRESHOLD` in `src/data/catalog.js`.

### Forms
`useProductForm` holds the form values and runs `validateProduct()` on every
change. It also records the starting values so it can tell which fields have
changed (used for the amber dots and the unsaved-changes bar). Prices and
stock are compared as numbers, so `129` and `129.00` count as unchanged.

`ProductFormFields` renders the same fields for Add and Edit. Each input is
wired to its label and error message for screen readers.

### Unsaved changes guard (Edit page)
- While any field differs from the saved product, `UnsavedChangesBar` is shown.
  Its Save button submits the form through the `form="edit-form"` attribute.
- `useBlocker` intercepts in-app navigation and opens `ConfirmDialog`.
  "Keep editing" cancels the navigation; "Leave page" continues it.
- A `beforeunload` listener triggers the browser's warning when closing or
  reloading the tab.
- After a successful save, a flag lets the redirect through without asking.

### Draft autosave (Add page)
`useDraft` saves the form about 0.6 seconds after you stop typing. An empty
form removes the draft. The relative time ("just now", "3 minutes ago") is
refreshed every 15 seconds. The draft is deleted after the product is added.

### Delete toast
The details page deletes the product and passes `{ product, index }` to the
products page in the navigation state. The products page shows a `Toast`. Its
countdown is a CSS animation; when the animation ends the toast closes, so the
visual bar and the timer always match. Hover and keyboard focus pause it.

---

## Design system and theming

### Tokens
All colours, shadows and radii live in `src/styles/tokens.css` as CSS custom
properties. Components only use these variables, never raw colour codes. This
works like Figma variables: there is one set of token names with two modes.

- **Light mode**: the `:root` block (sampled from the Figma mock-ups).
- **Dark mode**: the `:root[data-theme='dark']` block.

Switching mode only changes the `data-theme` attribute on `<html>`.

### Main tokens

| Token                    | Light     | Dark      | Used for                                  |
| ------------------------ | --------- | --------- | ----------------------------------------- |
| `--color-bg`             | `#F9FAFB` | `#0F172A` | Page background                           |
| `--color-surface`        | `#FFFFFF` | `#1E293B` | Cards, top bar, dialogs                   |
| `--color-border`         | `#E5E7EB` | `#334155` | Borders                                   |
| `--color-text`           | `#111827` | `#F1F5F9` | Main text                                 |
| `--color-text-secondary` | `#374151` | `#CBD5E1` | Body copy (muted)                         |
| `--color-text-muted`     | `#6B7280` | `#94A3B8` | Captions, labels (subtle)                 |
| `--color-primary`        | `#4F46E5` | `#6366F1` | Focus rings, active borders, icons        |
| `--color-primary-text`   | `#4F46E5` | `#818CF8` | Indigo text: links, eyebrows, active nav  |
| `--color-primary-fill`   | `#4F46E5` | `#6264F0` | Solid buttons with white text             |
| `--color-primary-50`     | `#EEF2FF` | `#1E1B4B` | Hero, tips panel, chips                   |
| `--color-success`        | `#15803D` | `#4ADE80` | In stock, success messages                |
| `--color-warning`        | `#B45309` | `#FBBF24` | Low stock, unsaved-change dots            |
| `--color-danger`         | `#B91C1C` | `#F87171` | Out of stock, errors                      |
| `--image-opacity`        | `1`       | `0.9`     | Dims photos in dark mode                  |

### Why there are three "primary" tokens
In dark mode, the requested indigo `#6366F1` doesn't reach 4.5:1 contrast as
text (3.27:1 on cards) or behind white button text (4.47:1). So it is split by
role:
- `--color-primary` keeps `#6366F1` for non-text accents (they only need 3:1).
- `--color-primary-text` uses `#818CF8` for indigo text (4.90:1 or better).
- `--color-primary-fill` uses `#6264F0`, which looks the same as `#6366F1` but
  gives white text 4.56:1. Button hover darkens to `#4F46E5` (6.29:1).

The contrast ratio of every dark-mode text colour is noted next to it in
`tokens.css`.

### How the theme is chosen
1. A small script in `index.html` runs before the page draws. It uses the saved
   choice (`localStorage` key `shopadmin.theme`) or, if there is none, the
   operating system setting. This prevents a white flash in dark mode.
2. `useTheme` keeps `data-theme` in sync and saves the choice when you click
   the toggle. If you haven't chosen, it follows OS changes live.

### Typography
Inter (400, 500, 600, 700) from Google Fonts, falling back to the system
sans-serif. Page titles are 32px bold, body text 16px, labels 13px semibold.

---

## Responsive design

The CSS is written **mobile-first**: base styles target phones, and
`min-width` media queries add tablet and desktop layouts.

| Width       | Layout                                                                 |
| ----------- | ---------------------------------------------------------------------- |
| < 480px     | Full-width buttons, stacked Price/Stock fields                         |
| < 520px     | 1-column product grid, 16px side margins                               |
| ≥ 520px     | 2-column product grid                                                  |
| ≥ 640px     | 32px side margins, side-by-side footer                                 |
| ≥ 768px     | 4 summary cards in a row, toolbar on one line                          |
| ≥ 900px     | 3-column product grid                                                  |
| ≥ 1024px    | Sidebar always visible (below this it is a drawer opened with ☰); two-column details, edit and add pages |
| ≥ 1200px    | 4-column product grid, 80px side margins (the 1440px mock-up layout)   |

The content column is at most 1280px wide.

---

## Accessibility

- **Semantic HTML**: `header`, `nav`, `main`, `footer`, headings in order,
  lists for grids, `dl` for the summary cards.
- **Labels on every input**; required fields use `aria-required`.
- **Errors linked to inputs** with `aria-invalid` and `aria-describedby`, so
  screen readers read the message with the field. On a failed submit, focus
  moves to the first invalid field.
- **Alt text** on all product images; missing or broken images show a labelled
  placeholder.
- **Keyboard support** everywhere: visible focus rings, a "Skip to content"
  link, <kbd>/</kbd> for search, and full arrow-key support in the custom
  dropdowns.
- **Dialogs** use the native `<dialog>` element: focus is trapped inside,
  <kbd>Esc</kbd> closes it, focus starts on the safe choice and returns to the
  button that opened it.
- **Live regions** announce result counts, success messages and toasts.
- **Colour contrast** meets WCAG AA (4.5:1) for all text in both themes.
  Disabled controls are exempt from this rule and are shown muted.
- **Timing**: the Undo toast pauses on hover and focus.
- **Reduced motion**: animations are turned off for users who ask for less
  motion (the toast countdown still runs, because it is a timer).

---

## Testing

```bash
npm test             # run once
npm run test:watch   # watch mode
```

| File                                  | Covers                                                    |
| ------------------------------------- | --------------------------------------------------------- |
| `src/utils/validation.test.js`        | Every validation rule and message                         |
| `src/utils/filterProducts.test.js`    | Search, filters, sorting and stock counts                 |
| `src/data/productStore.test.js`       | Seeding, create, update, delete/restore, corrupt storage  |
| `src/test/app.test.jsx`               | Full user flows in the real app                           |

The user-flow tests render the app at a URL and use it like a person would.
They cover live search and "No products found", dropdown filters, add-form
errors and focus, adding a product, editing and saving, delete with Undo,
"Product not found", the 404 page, the theme toggle, the unsaved-changes bar
and Discard, the "Leave without saving?" dialog, draft autosave and restore,
and the form field states page.

`src/test/setup.js` removes the artificial delay and clears `localStorage`
before every test.

---

## Data and browser storage

| `localStorage` key           | Contents                              |
| ---------------------------- | ------------------------------------- |
| `shopadmin.products.v1`      | The product catalog (JSON array)      |
| `shopadmin.addProductDraft`  | The unsaved Add-form draft            |
| `shopadmin.theme`            | `"light"` or `"dark"`                 |

Data lives only in the browser you use. Another browser, a private window or
another computer starts with the 8 sample products.

**Reset to the sample products:** open the browser DevTools console and run

```js
localStorage.removeItem('shopadmin.products.v1')
```

then refresh. To reset everything, run `localStorage.clear()`.

---

## Customising

| To change…                         | Edit                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| Colours (either theme)             | `src/styles/tokens.css`                                     |
| Sample products                    | `src/data/seedProducts.js`, then reset storage (see above)  |
| Categories                         | `CATEGORIES` and `CATEGORY_CODES` in `src/data/catalog.js`  |
| Low-stock threshold                | `LOW_STOCK_THRESHOLD` in `src/data/catalog.js`              |
| Sort options                       | `SORT_OPTIONS` in `src/data/catalog.js` and `src/utils/filterProducts.js` |
| Validation rules or messages       | `src/utils/validation.js`                                   |
| Fake loading delay                 | `latency` in `src/data/productStore.js` (set to 0 to remove) |
| Undo toast duration                | `TOAST_MS` in `src/pages/Products.jsx`                      |
| Draft autosave delay               | `AUTOSAVE_DELAY` in `src/hooks/useDraft.js`                 |

### Connecting a real backend
Replace the bodies of the functions in `src/data/productStore.js` with
`fetch()` calls to your API, keeping the same names and return values. The
pages, loading states and error states will keep working unchanged.

---

## Design decisions and assumptions

The mock-ups (`design/main-screens.pdf`, `design/states.pdf`,
`design/product-filters.pdf`) are desktop-only Figma exports at 1440px. Where
they didn't show something, these choices were made:

- **Phone and tablet layouts** are not in the mock-ups and were designed to
  follow the desktop look (see [Responsive design](#responsive-design)).
- **Font**: the PDFs contain text as shapes, so the font name couldn't be
  read. It looks like Inter, which is used.
- **Low stock** means 5 or fewer units (the mock-up shows 3 as low and 12+ as
  in stock). The "In stock" filter excludes low-stock items, matching the
  mock-up's 6 / 1 / 1 counts.
- **Sort options**: only "Name A-Z" appears in the mock-up; the others were
  added. Name A-Z is the default, as in the filters mock-up.
- **SKU codes** other than `SA-EL-001` were invented following the same pattern.
- **Descriptions**: only the headphones text comes from the mock-up; the other
  seven were written to match.
- **Image URLs** may be `https://` addresses or site paths like
  `/products/x.jpg` (needed by the sample products). A URL that fails to load
  shows "Image unavailable" but doesn't block saving.
- **Dark-mode indigo** was split into three tokens to meet contrast rules (see
  [Why there are three "primary" tokens](#why-there-are-three-primary-tokens)).
- **Loading and error states** use a short artificial delay and the
  `?simulate=error` flag so they can be seen, since `localStorage` is instant.
- **Unsaved changes**: while the bottom bar is showing, it replaces the form's
  own Save/Cancel buttons so there aren't two Save buttons.
- **Drafts** include a "Discard draft" link so an old draft doesn't keep coming
  back.
- **Back link on Edit** goes to the product list, as labelled in the mock-up.

---

## Troubleshooting

| Problem                                      | Fix                                                                  |
| -------------------------------------------- | -------------------------------------------------------------------- |
| `npm test` fails with an engine error        | Update Node.js to 22.12 or newer                                     |
| Products disappeared or look wrong           | Reset storage (see [Data and browser storage](#data-and-browser-storage)) |
| "Couldn't load products" won't go away       | Remove `?simulate=error` from the URL, or reset storage if the saved data is corrupt |
| A page shows 404 after deploying             | Configure the host to serve `index.html` for all routes (single-page app fallback) |
| The font looks different                     | Inter loads from Google Fonts; offline, the system font is used      |
| An old draft appears on the Add page         | Click "Discard draft" under "Product information"                    |

---

## Screenshots

<!-- Add current screenshots here. The images in docs/screenshots/ were taken
     before the dashboard redesign (commit 33451af), so they show the old
     Landing page and top navbar. -->

| Page | Screenshot |
| ---- | ---------- |
| Dashboard (1440px) | _to add_ |
| Products with filters (1440px) | _to add_ |
| Product details (1440px) | _to add_ |
| Add product (1440px) | _to add_ |
| Products (375px) | _to add_ |

---

## Team

Area owners come from the task assignment in
[`CONTRIBUTIONS.md`](CONTRIBUTIONS.md), which is also the record of who did
what, with commit hashes, PRs and reviews.

| GitHub | Area owned |
| ------ | ---------- |
| [@Biyaki25](https://github.com/Biyaki25) (repo owner) | `feature/tests`, `feature/product-form`, `feature/responsive` |
| [@adrielmacharia1](https://github.com/adrielmacharia1) | `feature/landing` |
| [@bensonambani](https://github.com/bensonambani) | `docs/report` |
| [@Evans324](https://github.com/Evans324) | `feature/product-list` |
| [@mfknotis](https://github.com/mfknotis) | `feature/product-detail` |

---

## AI tools used

This matches Section 12 of the project report
([`docs/ShopAdmin-Report.pdf`](docs/ShopAdmin-Report.pdf)), which lists the
items each member still has to confirm.

| Tool | Used for | What the team did |
| ---- | -------- | ----------------- |
| Figma AI | Polishing the mock-ups: spacing, alignment, example content, state variants | Reviewed every frame and fixed inconsistencies by hand |
| Claude (chat) | Planning components and routes, explaining concepts, reviewing approaches | Made the choices and checked explanations against the React and React Router docs |
| Claude Code | Scaffolding files, generating components, CSS and tests from the mock-ups, debugging, writing the README and report, and the Git workflow docs (`CONTRIBUTING.md`, `CONTRIBUTIONS.md`, PR template) | Read and ran the generated code; ran tests, lint and build; tested every screen in the browser |

Commits written with Claude Code carry a `Co-Authored-By: Claude` line, so
they can be found with `git log --grep="Co-Authored-By: Claude"`.
