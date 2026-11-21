import Layout from './components/layout/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Products from './pages/Products.jsx'
import AddProduct from './pages/AddProduct.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import EditProduct from './pages/EditProduct.jsx'
import NotFound from './pages/NotFound.jsx'
import FieldStates from './pages/FieldStates.jsx'

/**
 * Route table. Every page renders inside <Layout>, which supplies the shared
 * header and footer. It's used with React Router's "data router"
 * (createBrowserRouter in main.jsx, createMemoryRouter in tests) because the
 * Edit page needs useBlocker() for its "Leave without saving?" dialog.
 *
 *   /                          Landing page
 *   /products                  Product list with search & filters
 *   /products/new              Add product form (autosaves a draft)
 *   /products/:id              Product details
 *   /products/:id/edit         Edit product form (unsaved-changes bar)
 *   /components/form-fields    Form field states reference sheet
 *   anything else              404
 */
export const routes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'products', element: <Products /> },
      { path: 'products/new', element: <AddProduct /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'products/:id/edit', element: <EditProduct /> },
      { path: 'components/form-fields', element: <FieldStates /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
