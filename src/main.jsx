import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'

// Global styles, in order: design tokens -> base/reset -> shared controls.
import './styles/tokens.css'
import './styles/base.css'
import './styles/buttons.css'
import './styles/forms.css'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
