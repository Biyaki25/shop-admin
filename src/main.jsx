import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'

// Global styles, in order: design tokens -> base/reset -> shared controls.
import './styles/tokens.css'
import './styles/base.css'
import './styles/buttons.css'
import './styles/forms.css'

// BASE_URL is '/' locally and '/shop-admin/' on GitHub Pages.
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
