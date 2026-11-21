import { Link } from 'react-router-dom'
import StatusCard from '../components/ui/StatusCard.jsx'

/** Shown for /products/<id> (or its edit page) when no product has that id. */
export default function ProductNotFound() {
  return (
    <div className="page">
      <div className="container">
        <StatusCard
          icon="box"
          title="Product not found"
          headingLevel={1}
          action={
            <Link to="/products" className="btn btn--primary btn--sm">
              Back to products
            </Link>
          }
        >
          This product may have been deleted, or the link is no longer valid.
        </StatusCard>
      </div>
    </div>
  )
}
